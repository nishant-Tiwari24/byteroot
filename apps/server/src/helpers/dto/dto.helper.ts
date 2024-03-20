import {
  ClassConstructor,
  plainToClass,
  plainToInstance,
} from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import 'reflect-metadata'
import { Utility } from '../utility'

export namespace DtoHelper {
  /* -------------------------------------------------------------------------- */
  /*                  FILTER PROPERTIES BEFORE SENDING RESPONSE                 */
  /* -------------------------------------------------------------------------- */
  // ? Overloaded function signature
  export function apply<ClassType, TargetType extends ClassType>(
    className: ClassConstructor<ClassType>,
    target: TargetType[],
  ): ClassType[]

  // ? Overloaded function signature
  export function apply<ClassType, TargetType extends ClassType>(
    className: ClassConstructor<ClassType>,
    target: TargetType,
  ): ClassType

  // ? Function implementation (not visible from the outside)
  export function apply<ClassType, TargetType extends ClassType>(
    className: ClassConstructor<ClassType>,
    target: TargetType,
  ): ClassType {
    return plainToClass(className, target ?? {}, {
      excludeExtraneousValues: true,
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                  CHECK PROPERTIES BEFORE HANDLING REQUEST                  */
  /* -------------------------------------------------------------------------- */

  export function validationFactory<T>(
    metadataKey: Symbol,
    model: { new (...args: any[]): T },
    source: 'body' | 'query',
  ) {
    return function (
      target: any,
      propertyName: string,
      descriptor: TypedPropertyDescriptor<Function>,
    ) {
      Reflect.defineMetadata(metadataKey, model, target, propertyName)

      const method = descriptor.value

      descriptor.value = async function () {
        const model = Reflect.getOwnMetadata(metadataKey, target, propertyName)

        const [request, response] = arguments
        const plain = request[source]
        const instance = plainToInstance(model, plain)

        const errors = await validate(instance)

        if (errors.length > 0) {
          response.status(400).json(transformValidationErrorsToJSON(errors))
          return
        }

        const keys = Object.getOwnPropertyNames(new model())
        const body = {}

        for (const key of keys) {
          if (Utility.isDefined(plain[key])) {
            body[key] = plain[key]
          }
        }

        request.body = body

        return method.apply(this, arguments)
      }
    }
  }

  function transformValidationErrorsToJSON(errors: ValidationError[]) {
    return errors.reduce((p, c: ValidationError) => {
      if (!c.children || !c.children.length) {
        p[c.property] = Object.keys(c.constraints).map(
          key => c.constraints[key],
        )
      } else {
        p[c.property] = transformValidationErrorsToJSON(c.children)
      }
      return p
    }, {})
  }
}
