import CustomException from "@app/models/error/custom-exception";

export const customErrorMessages: Map<CustomException, string> = new Map<CustomException, string>([
    [CustomException.METHOD_ARGUMENT_NOT_VALID_EXCEPTION, 'Invalid argument'],
    [CustomException.CUSTOM_TEST_EXCEPTION, 'test exception']
]);
