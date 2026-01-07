export const OrmExceptionHandling = (error: any) => {
    if (error instanceof Error) {
        return new Error(`Database Error: ${error.message}`);
    }
    return new Error('An unexpected error occurred');
}
