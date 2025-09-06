export function cleanInput(input: string): string[] {
    // Split on whitespace, then filter on truthy values (drop whitespace)
    const lowerInput = input.toLowerCase();
    const values: string[] = lowerInput.split(" ").filter((val) => val);
    return values;
}
