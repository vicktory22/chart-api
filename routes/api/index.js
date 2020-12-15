const axios = require('axios');
const moment = require('moment');

async function routes (fastify, options) {

  const opts = {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }

  fastify.get('/', async (request, reply) => {
    const today = moment();
    const startDate = today.clone().subtract(1, 'y').format('YYYY-MM-DD');
    const endDate = today.clone().format('YYYY-MM-DD');
    const ticker = 'AMPE';
    //const endDate = today.format('YYYY-MM-DD');
        
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?sort=asc&apiKey=${process.env.API_KEY}`;
        

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  })
}

module.exports = routes