export default class RequiredValidationRule {
    static evaluate (target: any, value: any, key: string): string | null {
        console.log(value)
        if(!value.length) {
            return null
        }

        return `${key} is required`
    }
}