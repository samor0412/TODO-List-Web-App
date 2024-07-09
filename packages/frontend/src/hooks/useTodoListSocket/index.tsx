import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { onTodoCreated, onTodoDeleted, onTodoUpdated } from './helper'
import { queryClient } from 'App'
import { WEBSOCKET_EVENT } from './constants'
import { toast } from 'react-toastify'

const useTodoListSocket = (id: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (id) {
      setSocket(
        io(`${import.meta.env.VITE_BACKEND_URL}?todoListId=${id}`, {
          transports: ['websocket']
        })
      )
    }
  }, [id])

  useEffect(() => {
    if (socket) {
      socket.on('connect', onConnect)
      socket.on('disconnect', onDisconnect)
      socket.on(WEBSOCKET_EVENT.TODO_UPDATED, onTodoUpdated(queryClient))
      socket.on(WEBSOCKET_EVENT.TODO_DELETED, onTodoDeleted(queryClient))
      socket.on(WEBSOCKET_EVENT.TODO_CREATED, onTodoCreated(queryClient))
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect)
        socket.off('disconnect', onDisconnect)
        socket.off(WEBSOCKET_EVENT.TODO_UPDATED, onTodoUpdated(queryClient))
        socket.off(WEBSOCKET_EVENT.TODO_DELETED, onTodoDeleted(queryClient))
        socket.off(WEBSOCKET_EVENT.TODO_CREATED, onTodoCreated(queryClient))
      }
    }
  }, [socket])

  function onConnect() {
    console.debug('connected')
    setIsConnected(true)
  }

  function onDisconnect() {
    console.debug('disconnected')
    toast.error('Websocket disconnected', { autoClose: 3000 })
    setIsConnected(false)
  }
  return { isConnected }
}

export default useTodoListSocket
