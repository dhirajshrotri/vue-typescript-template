import { createDecorator } from 'vue-class-component'
const RequiredValidationRule = require('@/modules/RequiredValidationRule')
import 'reflect-metadata'

const requiredRule = {
    evaluate (target: any, value: any, key: string): string | null {
        if(value) {
            return null
        }
        return `${key} is required`
    }
}

const passwordRule = {
    evaluate(target: any, value: any, key: string): string | null {
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if(passwordRegex.test(value)) {
            return null
        }

        return `${key} is not valid`
    }
}

// const Validate = function(target) {
//     const keys = Reflect.getMetadata('validation', target) as string[]
//     let errorMessages: string[] = []
//     if(Array.isArray(keys)) {
//         for(const key of keys) {
//             const rules = Reflect.getMetadata("validation", target, key) 
//             if (!Array.isArray(rules)) {
//                 continue;
//             }
//             for(const rule of rules) {
//                 const error = rule.evaluate(target, target[key], key)
//                 if(error) {
//                     errorMessages.push(error)
//                 }
//             }
//         }
//     }
//     return errorMessages
// }
// const Validate = function(options): string[] {
//     const keys = Reflect.getMetadata('validation', options) as string[]
//     let errorMessages: string[] = []
//     if(Array.isArray(keys)) {
    //     for(const key of keys) {
    //         const rules = Reflect.getMetadata("validation", options, key) 
    //         if (!Array.isArray(rules)) {
    //             continue;
    //         }
    //         for(const rule of rules) {
    //             const error = rule.evaluate(options, options[key], key)
    //             if(error) {
    //                 errorMessages.push(error)
    //             }
    //         }
    //     }
    // }
//     return errorMessages
// }

const Validate = createDecorator((options, key) =>{
    const method = options[key]
    const keys = Reflect.getMetadata('validation', options) as string[]
    let errorMessages: string[] = []
    if(Array.isArray(keys)) {
        for(const key of keys) {
            const rules = Reflect.getMetadata("validation", options, key) 
            if (!Array.isArray(rules)) {
                continue;
            }
            for(const rule of rules) {
                const error = rule.evaluate(options, options[key], key)
                if(error) {
                    errorMessages.push(error)
                }
            }
        }
    }
    options.errorMessages = errorMessages
    console.log(options)
})

const Required = createDecorator((options, key) => {
   
    addValidationRule(options, key, requiredRule)
})

const Password = createDecorator((options, key) => {
    addValidationRule(options, key, requiredRule)
})

const addValidationRule = function(target, propertyKey, rule) {
    let rules = Reflect.getMetadata("validation", target, propertyKey) || []
    rules.push(rule)
    
    let properties: string[] = Reflect.getMetadata("validation", target) || []
    if(properties.indexOf(propertyKey) < 0) {
        properties.push(propertyKey)
    }

    Reflect.defineMetadata("validation", properties, target)
    Reflect.defineMetadata("validation", rules, target, propertyKey)
}

export { Required, Password, Validate }
