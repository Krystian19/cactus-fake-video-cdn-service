import test from 'ava';
import axios from 'axios';

const PORT = process.env.SERVER_PORT || 3000;
const baseUrl = `http://localhost:${PORT}`;

test('Video static route is not working', async (t) => {

  try {
    const res = await axios.get(`${baseUrl}/test`);

    // Response was successful
    t.is(res.status, 200);
  } catch (err) {
    console.error('Server failed to respond with test image file.');
  }
});
