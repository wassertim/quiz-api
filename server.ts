import {app} from "./app";

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});