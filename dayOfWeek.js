function dayOfWeek() {
    return new Date().toLocaleDateString('en-EN', { 'weekday': 'long' });
}
