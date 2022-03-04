import Head from "next/head";
import Image from "next/image";
import { Banner } from "../components/banner";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import { fetchCoffeStores } from "../lib/coffestores";
import useTrackLocation from "../hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  const { dispatch, state } = useContext(StoreContext);

  //const [coffeeStores, setCoffeeStores] = useState("");
  const [coffeeStoresError, setCoffeeStoresError] = useState("");
  const { coffeeStores, latLong } = state;

  useEffect(() => {
    const fetchData = async (latLong) => {
      if (latLong) {
        try {
          //const fetchedCoffeStores = await fetchCoffeStores(latLong, 20);
          const response = await fetch(
            `/api/getCofeeStoresByLocation?latLong=${latLong}&limit=20`
          );
          const coffeeStores = await response.json();

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          });
          setCoffeeStoresError("");
        } catch (error) {
          setCoffeeStoresError(error);

          //console.log({ error });
        }
      }
    };
    fetchData(latLong);
  }, [latLong, dispatch]);
  //console.log({ latLong, locationErrorMsg });

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Coinnesseur</title>
        <meta
          name="description"
          content="APP desarrollada por Jaime de Greiff"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Buscando" : "Ver cafeterías cerca"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg ?? "ErrorA" + locationErrorMsg}
        {coffeeStoresError ?? "ErrorB" + coffeeStoresError}
        <div className={styles.heroImage}>
          <Image
            src="/static/cofee.png"
            alt="Coffe"
            width={440}
            height={322}
          ></Image>
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Cerca de mi</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeStore) => {
                return (
                  <Card
                    key={coffeStore.id}
                    className={styles.card}
                    name={coffeStore.name}
                    imgUrl={coffeStore.imgUrl || "/static/cofee.png"}
                    href={`/coffee-store/${coffeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeStore) => {
                return (
                  <Card
                    key={coffeStore.id}
                    className={styles.card}
                    name={coffeStore.name}
                    imgUrl={coffeStore.imgUrl || "/static/cofee.png"}
                    href={`/coffee-store/${coffeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
/* 
https://meshgradient.com/
*/

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeStores();

  return {
    props: {
      coffeeStores: coffeeStores,
    },
  };
}
