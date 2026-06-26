import client from "../index.ts";
const addToRoom = async () => {
  try {
    const roomId = await client.get("key");
    if (roomId == null) {
      // Find a cool server that can handle it
      await client.set("key", "value");
    } else {
      // Return the server ip in a cookie
    }
  } catch (e) {
    console.error(e);
  }
};

export default addToRoom;
