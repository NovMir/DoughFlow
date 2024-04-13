"use strict";
const express = require('express');
const cors = require('cors');
// Create express inst
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map