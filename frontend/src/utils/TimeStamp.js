// Function to convert a ULID to a Date
export function ulidToDate(ulid) {
    // Extract the timestamp part (first 10 characters)
    const timestampPart = ulid.slice(0, 10);
    
    // Convert from Crockford's Base32 to a decimal timestamp
    const base32Chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    let timestamp = 0;
    
    for (let i = 0; i < timestampPart.length; i++) {
        const value = base32Chars.indexOf(timestampPart[i]);
        timestamp = timestamp * 32 + value; // Convert to decimal
    }
    
    // The timestamp is in milliseconds, convert to Date object
    return new Date(timestamp);
}

// Example ULID
const ulid = "01JANKP2571YKXBF3XWT2ZDWVM";
const date = ulidToDate(ulid);

console.log(date); // Logs the date
console.log(date.getTime()); // Logs the timestamp in milliseconds
