import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const name = "Norway";
  const apiKey = "04d1463bba42bc6026693fb220e5646c";
  const [city, setCity] = useState({});
  const [isLoading, setIsLoading] = useState(false); //ตรวจสอบว่าดึงข้อมูลจาก api มาครบหรือยัง

  useEffect(() => {
    // สอบถามข้อมูลไปที่ api
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`; //ส่ง request ไปที่ api
    fetch(apiUrl)
      .then((res) => res.json()) // ส่งกลับมาในรูปแบบ Json
      .then((data) => {
        //แปลงเป็นข้อมูลที่อ่านได้
        setCity(data); //นำข้อมูลที่อยู่ในdata เก็บลงใน state city
        setIsLoading(true);
      });
  }, [name]); //หรือดัก state name เมื่อมีการเปลี่ยนแปลงข้อมูลให้ทำการ load ข้อมูลใหม่

  const convertTemp = (k) => {
    return (k - 273).toFixed();
  }; //แปลงหน่วย อุณหภูมิ

  return (
    isLoading && ( //เมื่อจะทำการ return หรือ แสดงหน้าเว็บ ค่าใน isLoading ต้องเป็นจริง
      <div className="App">
        <section>
          <div className="location">
            <h1 className="city">{city.name}</h1>
            <p className="state">{city.sys.country}</p>
          </div>
          <div className="card">
            <div className="weather">
              <h1>{convertTemp(city.main.temp)}&deg;C</h1>
              <small>
                max: {convertTemp(city.main.temp_max)}&deg;C | min:{" "}
                {convertTemp(city.main.temp_min)}&deg;C
              </small>
            </div>
            <div className="info">
              <div className="status">{city.weather[0].main}</div>
              <div className="humidity">humidity: {city.main.humidity}</div>
              <div className="wind">Wind Speed: {city.wind.speed}</div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default App;
