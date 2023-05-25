
import { Component, ReactNode } from "react";
import React from "react";
import { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { VirtualScroller } from 'primereact/virtualscroller';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ISystem from "../model/system";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { VisibilityContext } from "react-horizontal-scrolling-menu";

type CounterProps = {
  index: number
  system: ISystem,
  Istart: number,
  Iend: number
};
type CounterState = {

};
class System extends Component<CounterProps, CounterState>{

  state = {
    flag: false,
  }
  //Added to favorites list:
  addfavorite() {
    const FavoritesList: ISystem[] = []
    const Data = sessionStorage.getItem("system")
    sessionStorage.removeItem("system")
    if (Data) {
      const Systems = JSON.parse(Data)
      Systems.forEach((element: ISystem) => {
        FavoritesList.push(element)
      });
    }
    FavoritesList.push(this.props.system)
    this.setState({ flag: true })
    sessionStorage.setItem("system", JSON.stringify(FavoritesList))
    console.log(this.props.system);
  }

  //Delete from favorites list
  removefavorite() {
    this.setState({ flag: false })
    const FavoritesList: ISystem[] = []
    const data = sessionStorage.getItem("system")
    sessionStorage.removeItem("system")
    if (data) {
      const System = JSON.parse(data)
      System.forEach((element: ISystem) => {
        if (element.name != this.props.system.name) {
          FavoritesList.push(element)
        }
      });
    }
    sessionStorage.setItem("system", JSON.stringify(FavoritesList))
    console.log(this.props.system);
  }

  //sessionStorageבודקת אם יש מועדפים ב
  componentDidMount(): void {
    const FavoritesList: ISystem[] = []
    var Systems = sessionStorage.getItem("system")
    if (Systems) {
      const res = JSON.parse(Systems)
      res.forEach((system: ISystem) => {
        FavoritesList.push(system)
      });
    }
    FavoritesList.forEach((element: ISystem) => {
      if (element.id == this.props.system.id) {
        this.setState({ flag: true })
      }
    });
  }

  render() {
    return (
      <>
        {this.props.index >= this.props.Istart && this.props.index <= this.props.Iend ?
          <div>
            <Card sx={{ maxWidth: "345px", height: '40vh', display: 'flex', flexDirection: 'column', margin: '5px' }}  >

              <a href={this.props.system.link} target="_blank">
                <CardContent sx={{ maxWidth: "345px", height: '25vh', display: 'flex', flexDirection: 'column', margin: '5px' }} style={{ backgroundImage: `url(${this.props.system.image})` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", placeItems: "center" }}>
                    <div>
                      <Typography gutterBottom variant="h5" component="div">
                        {this.props.system.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" style={{ maxWidth: '100vh', maxHeight: "30vh" }}>
                        {this.props.system.description.length > 100 ?
                          `${this.props.system.description.substring(0, 100)}...` : this.props.system.description
                        }
                      </Typography></div>
                  </div>
                </CardContent>
              </a>
              <CardActions style={{ height: "20vh" }}>
                {this.state.flag ? <h6>הסרה מרשימת המועדפים</h6> : <h6>הוספה לרשימת המועדפים</h6>}
                {this.state.flag ? <FavoriteIcon onClick={() => { this.removefavorite() }}></FavoriteIcon> :
                  <FavoriteBorderIcon onClick={() => { this.addfavorite() }}></FavoriteBorderIcon>}
              </CardActions>

            </Card>
          </div>
          : <></>}
      </>
    );
  }
}
export default System;






