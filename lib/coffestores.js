//UNSPLASH API
import { createApi } from "unsplash-js";
//console.log(process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY);
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeStores = (latLong, query, limit) => {
  //console.log("LATITUDELONGITUDE", latLong);
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}&v=20210525&limit=${limit}`;
};

const getListOfPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "stockholm",
    perPage: 40,
    orientation: "landscape",
  });
  const unsplashPhotos = photos.response.results;
  return unsplashPhotos.map((result) => result.urls["small"]);
};
//4.647004,-74.053894

export const fetchCoffeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 6
) => {
  //console.log({ latLong });
  const photos = await getListOfPhotos();
  //console.log("FFF", photos);
  const response = await fetch(getUrlForCoffeStores(latLong, "café", limit), {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });

  const data = await response.json();

  return data.results.map((sitio, i) => {
    return {
      //...sitio,
      id: sitio.fsq_id,
      address: sitio.location.address
        ? sitio.location.address
        : "sin dirección",
      neighborhood: sitio.location?.neighborhood
        ? sitio.location?.neighborhood[0]
        : sitio.location?.locality
        ? sitio.location?.locality
        : sitio.location?.region
        ? sitio.location?.region
        : sitio.location?.country,
      name: sitio.name,

      imgUrl: photos[i],
    };
  });
};
