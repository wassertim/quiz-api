import { app } from "./src/app";
import { mongoConnect } from "./src/db";

const PORT = process.env.PORT || 5050;

mongoConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
