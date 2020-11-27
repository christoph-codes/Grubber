export const constants = {
    PORT: 3333,
    ALLOWED_ORIGINS: 'http://localhost:4200',
    API_TIMEOUT: 10000,
    REJECT_IPS: [],
    SANITIZE_FIELDS_LOGGING: ['password', 'user_pass', 'user_hash'],
    SALT_VALUE: 'This is totally secure.',
    SESSION_COOKIE: 'G_SESSION_ID',
    WEAK_PASSWORDS: ['123456', 'password', '123456789', '12345678', '12345', '111111',
                '1234567', 'sunshine', 'qwerty', 'iloveyou', 'princess', 'admin', 'welcome',
                '666666', 'abc123', 'football', '123123', 'monkey', '654321', '!@#$%^&amp;*',
                'charlie', 'aa123456  w', 'donald','password1', 'qwerty123']
};
