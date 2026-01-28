import React from "react";
import { Carousel, Container } from "react-bootstrap";
import { Images } from "../../Constants/Images";
import { SortedProducts } from "../SortedProducts/SortedProducts";

export const Home = () => {
  return (
    <div>
      <Carousel className="vh-100">
        <Carousel.Item>
          <img
            src={Images.Cloths}
            alt="Cloths"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Images.Electronics}
            alt="Electronics"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Images.Shoes}
            alt="Shoes"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Images.Cosmetics}
            alt="Cosmetics"
            className="d-block vh-100 w-100"
          />
        </Carousel.Item>
      </Carousel>
      <Container>
        <h1>Top Rated</h1>
        <SortedProducts sortBy="rating" order="desc" />
      </Container>
    </div>
  );
};
