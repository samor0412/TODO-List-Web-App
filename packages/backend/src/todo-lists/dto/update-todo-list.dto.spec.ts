import { validate } from "class-validator";
import { UpdateTodoListDto } from "./update-todo-list.dto";

describe('UpdateTodoListDto', () => {
  describe('validation',() => {
    it('should throw error when name is empty', async () => {{
      const dto = new UpdateTodoListDto();
      dto.name = '';
      await validate(dto).then((errors) => {
        expect(errors.length).toBeGreaterThan(0)
      })
    }})
    it('should throw error when name is not a string', async () => {{
      const dto = new UpdateTodoListDto();
      dto.name = 123 as unknown as string;
      await validate(dto).then((errors) => {
        expect(errors.length).toBeGreaterThan(0)
      })
    }})
  })
})