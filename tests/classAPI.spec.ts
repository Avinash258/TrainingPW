import {test,expect} from '@playwright/test';

test ('Get all',async({request})=>{

    const requestUrl = 'https://api.restful-api.dev/objects/ff8081819782e69e019974e216a907c4';
  // const requestUrl = 'https://api.restful-api.dev/objects';
    const response = await request.get(requestUrl);

    await expect(response.ok()).toBeTruthy();
     await expect(response.status()).toBe(200);

   await console.log(await response.json());

    
});

test ('Post CAll',async({request})=>{


    const requestUrl = 'https://api.restful-api.dev/objects';

    const data ={
         "name": "Isha",
         "data": {
         "year": 2019,
         "price": 1849.99,
        "CPU model": "Intel Core i9",
         "Hard disk size": "1 TB"
   }
    };


    const response = await request.post(requestUrl,{data});

     const responseBody = await response.json();
     
     console.log    ('id:-',responseBody.id);
     console.log    ('body',responseBody);

     await expect(response.ok()).toBeTruthy();
     await expect(response.status()).toBe(200);



});


test("Put CAll", async ({ request }) => {
  const requestUrl = "https://api.restful-api.dev/objects/ff8081819782e69e019974e99be107d1";
  const data = {
    name: "Apple MacBook Pro 16",
    data: {
      year: 2019,
      price: 2049.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
      color: "silver",
    },
  };
  const response = await request.put(requestUrl, { data });
  const responseBody = await response.json();
  console.log("Data:-", responseBody.updatedAt);
  console.log("body", responseBody);
});

test ('patch CAll',async({request})=>{
    const requestUrl = 'https://api.restful-api.dev/objects/ff8081819782e69e019974e216a907c4';
    const data ={
     "name": "Apple MacBook Pro 16",
     "data": {
     "year": 3030,
    
   }
    };


    const response = await request.patch(requestUrl,{data});

     const responseBody = await response.json();
     
     console.log    ('id:-',responseBody.id);
     console.log    ('body',responseBody);




});


test ('del CAll',async({request})=>{


    const requestUrl = 'https://api.restful-api.dev/objects/ff8081819782e69e019974e216a907c4';


    const response = await request.delete(requestUrl);

     const responseBody = await response.json();
     
     console.log    ('id:-',responseBody.id);
     console.log    ('body',responseBody);




});