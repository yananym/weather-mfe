import { Component, Injectable } from '@angular/core';
import axios from 'axios';
import { format, parseISO } from "date-fns";

@Component({
  selector: 'weather-mfe',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})

@Injectable()
export class ForecastComponent {
  title = 'Weather in';
  zip = "98033";
  city;
  forecast;

  constructor() {
    this.getWeather(this.zip)
  }

  http = axios.create({
    baseURL: 'http://dataservice.accuweather.com'
  });

  getWeather(zip: string) {
    const location = this.getLocation(zip);
    this.http.get(`/forecasts/v1/daily/1day/${zip}`, {
      params: {
        apikey: "LLSZiVoAlQCFWeUsam9hbN169qNKOuRR"
      }
    }).then(res => {
      this.forecast = {
        headline: res.data.Headline.Text,
        date: format(parseISO(res.data.Headline.EffectiveDate), "d LLLL yyyy"),
        day: {
          icon: res.data.DailyForecasts[0].Day.Icon,
          text: res.data.DailyForecasts[0].Day.IconPhrase,
        },
        night: {
          icon: res.data.DailyForecasts[0].Night.Icon,
          text: res.data.DailyForecasts[0].Night.IconPhrase,
        },
        temp: {
          max: res.data.DailyForecasts[0].Temperature.Maximum.Value,
          min: res.data.DailyForecasts[0].Temperature.Minimum.Value,
          unit: res.data.DailyForecasts[0].Temperature.Maximum.Unit,
        }
      }
    })
  }

  getLocation(zip: string){
    this.http.get('/locations/v1/postalcodes/search', {
      params: {
        apikey: "LLSZiVoAlQCFWeUsam9hbN169qNKOuRR",
        q: zip
      }
    }).then(res => {
      this.city = res.data[0].EnglishName;
      return res.data[0].ParentCity.Key;
    }).catch(err => {
      console.log(err);
      return "";
    })
  }

  getIconName(id: number) {
    if (id < 10) {
      return `0${id}-s.png`;
    } else {
      return `${id}-s.png`
    }
  }
}
