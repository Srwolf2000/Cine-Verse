export function time(minutes) {
    const hour = Math.floor(minutes / 60);
    const mins = minutes % 60;
     if(!minutes) return false;
    return `${hour}h ${mins}m`;
   
}