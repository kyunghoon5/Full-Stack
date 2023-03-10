import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tableAll.css';
import BlankPage from './BlankPage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import { values } from 'lodash';

var _ = require('lodash');
// or less ideally

export const SearchPage = () => {
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);
  const [imageClicked, setImageClicked] = useState();
  const [startDatePicker, setStartDatePicker] = useState(
    new Date('2022-09-09')
  );
  const [endDatePicker, setEndDatePicker] = useState(new Date());

  //DATE buttonSearch console
  const date = new Date();
  const curDate = date.toISOString().split('T')[0];
  const past30 = new Date();
  past30.setDate(past30.getDate() - 30);
  const past30c = past30.toISOString().split('T')[0];
  const past90 = new Date();
  past90.setDate(past90.getDate() - 90);
  const past90c = past90.toISOString().split('T')[0];
  const past365 = new Date();
  past365.setDate(past365.getDate() - 365);
  const past365c = past365.toISOString().split('T')[0];

  //POS select String to Array
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;
    setSelectedItem(value.split(','));
  };

  //data from dropdown list
  //console.log(selectedItem)

  //DataPick regarding option value
  const [loadingDatapick, setLoadingDatapick] = useState(false);
  

 useEffect(() => {
   if (selectedItem.length === 0) {
     return 
   }
   const fetchData = async () => {
     const curDate = new Date().toISOString().split('T')[0];
     const endDate = curDate;
     
     const date1 = new Date(selectedItem.map((item) => item).slice(1, 2));
     
     const startDate = date1.toISOString().split('T')[0];
     setLoadingDatapick(true);
     const response = await axios.get(
       `http://localhost:8082/dataPick?descrip=${record}&startDate=${startDate}&endDate=${endDate}`
     );
     setSelectedData(response.data);
     setLoadingDatapick(false);
   };

   fetchData();
 }, [selectedItem]);

  //data from dataPick
  //console.log(selectedData)

  const reset = () => {
    setSelectedItem([]);
    setSelectedData([]);
  };

  //all data
  //console.log(search);

  //datepicker between two dates
  const [selectedDatePicker, setSelectedDatePicker] = useState([]);

 
  const fetchData2 = async () => {
     if (search.length === 0) {
    return;
  }
    const endDate = endDatePicker.toISOString().split('T')[0];

    const startDate = startDatePicker.toISOString().split('T')[0];
 
    const response = await axios.get(
      `http://localhost:8082/datePicker?descrip=${record}&startDate=${startDate}&endDate=${endDate}`
    );
    setSelectedDatePicker(response.data);
  };
  


console.log(selectedDatePicker);
  

  //image handler
  const onClickImageHandler = () => {
    setImageClicked(`http://img.vanessahair.com/sales/${record}.jpg`);
  };

  // const [productData, setProductData] = useState([]);
  //   const itemData = async () => {
  //     return await axios
  //       .get('http://localhost:8082/mergeData')
  //       .then((response) => setProductData(response.data))
  //       .catch((err) => console.log(err));
  //   };

  //    useEffect(() => {
  //      itemData();
  //    }, [productData]);

  const [loading, setLoading] = useState(false);
  const searchRecords = () => {
    const searchedRecord = record.toLowerCase();

    setLoading(true);
    axios
      .get(`http://localhost:8082/mergeData?descrip=${searchedRecord}`)

      .then((response) => {
        setSearch(response.data);
        setLoading(false);
      });
  };


  //className & table-text
  const InfoItemOb = (props) => {
    return (
      <td className={props.className} style={{ textAlign: 'left' }}>
        {props.name}
      </td>
    );
  };
  //img.vanessahair.com/sales/MIST%20AILYN.jpg
  // const imgSrc = `http://localhost:8080/api/img/${name}.jpg`;

  //console.log(search);

  //Calculating the numbers of days between two dates
  const date1 = new Date(selectedItem.map((item) => item).slice(1, 2));
  const date2 = new Date();
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  //PRL
  const filteredItemsP = search.map((item) => item.cost);
  const PRLmin = Math.min(...filteredItemsP);
  const PRLmax = Math.max(...filteredItemsP);

  //total CLRS
  const filteredItems = search.filter((item) => item.itemkey2);
  const totalItems = filteredItems.length;

  //total REORDER
  const totalItems1 = _.sumBy(
    search.map((item) => _.sumBy(item.poreorder, 'total'))
  );

  //total OH
  const filteredItems2 = search.map((item) => item.onhand);
  const totalItems2 = _.sum(filteredItems2);

  //total POS_
  const filteredItems3 = selectedItem.map((item) => Number(item)).slice(2);
  const totalItems3 = _.sum(filteredItems3);

  //total Sold30, 90 365
  const totalItems4 = _.sumBy(
    search.map((item) => _.sumBy(item.sold30, 'qtyshp'))
  );

  const totalItems5 = _.sumBy(
    search.map((item) => _.sumBy(item.sold90, 'qtyshp'))
  );

  const totalItems6 = _.sumBy(
    search.map((item) => _.sumBy(item.sold365, 'qtyshp'))
  );

  //total PO qty
  const totalItems7 = _.sumBy(
    search.map((item) => _.sumBy(item.sixth, 'qtyord'))
  );
  const totalItems8 = _.sumBy(
    search.map((item) => _.sumBy(item.fifth, 'qtyord'))
  );
  const totalItems9 = _.sumBy(
    search.map((item) => _.sumBy(item.fourth, 'qtyord'))
  );
  const totalItems10 = _.sumBy(
    search.map((item) => _.sumBy(item.third, 'qtyord'))
  );
  const totalItems11 = _.sumBy(
    search.map((item) => _.sumBy(item.second, 'qtyord'))
  );
  const totalItems12 = _.sumBy(
    search.map((item) => _.sumBy(item.first, 'qtyord'))
  );

  const totalItemsFromRCVD = _.sumBy(
    selectedData.map((item) => _.sumBy(item.new, 'qtyshp'))
  );

  return (
    <div
      className="search"
      style={{
        width: '1800px',
        marginLeft: '-15',
        marginRight: '15',
        height: '1651px',
      }}
    >
      <div
        style={{
          width: '1400px',
          paddingLeft: '15px',
          paddingRight: '15px',
          height: '1651px',
        }}
      >
        <table id="tb1" className="table1">
          <tbody>
            <tr className="row1">
              <InfoItemOb className="infoCol1" name="ITEM:" />
              <td className="nameSection" colSpan="2">
                <input
                  id="search"
                  placeholder="Search item name here"
                  type="text"
                  onChange={(e) => setRecord(e.target.value)}
                  style={{
                    width: '150px',
                    marginLeft: '3px',
                    paddingLeft: '3px',
                    display: 'block',
                  }}
                />
              </td>

              <td className="btn1">
                <button
                  onClick={() => {
                    searchRecords();
                    onClickImageHandler();
                    reset();                    

                    
                  }}
                  className="btn1name"
                  id="submitBtn"
                  type="submit"
                >
                  SUBMIT
                </button>
              </td>
              <td
                colSpan="3"
                rowSpan="10"
                className="prodImg"
                style={{ height: '320px', widows: '240px' }}
              >
                <div>
                  {
                    <img
                      src={imageClicked}
                      className="mainImage"
                      style={{ height: '320px', widows: '240px' }}
                    />
                  }
                </div>
              </td>
              <td className="convST1">MONTH</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
            </tr>

            <tr className="row2">
              <InfoItemOb className="infoCol1" name="ITEM NO:" />
              <td colSpan="3" className="smpNo">
                {search.map((item, idx) => (
                  <div className="test2" key={idx}>
                    {item.original}
                  </div>
                ))}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="row3">
              <InfoItemOb className="infoCol1" name="ORIGINAL:" />
              <td colSpan="3">
                <span
                  className="original"
                  style={{ float: 'left', paddingLeft: '3px' }}
                ></span>
                <span
                  className="originalPo"
                  style={{ float: 'right', paddingRight: '3px' }}
                ></span>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="row4">
              <InfoItemOb className="infoCol1" name="SMP DTE:" />
              <td colSpan="3" className="smpDte"></td>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="row5">
              <InfoItemOb className="infoCol1" name="WEIGHT:" />
              <td colSpan="3">
                <span
                  className="weight"
                  style={{
                    float: 'left',
                    textAlign: 'center',
                    paddingLeft: '3px',
                  }}
                ></span>

                <span
                  className="weight_po"
                  style={{
                    float: 'right',
                    textAlign: 'center',
                    paddingRight: '3px',
                  }}
                ></span>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="row6">
              <InfoItemOb className="infoCol1" name="LENGTH:" />
              <td colSpan="3">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span className="length"></span>
                  <span>
                    <span style={{ marginBottom: '0px' }}></span>
                    <span className="fl"> </span>
                  </span>
                  <span style={{ paddingRight: '3px' }}>
                    <span style={{ marginBottom: '0px' }}></span>
                    <span className="pl"> </span>
                  </span>
                </div>
              </td>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="row7">
              <InfoItemOb className="infoCol1" name="FIBER:" />
              <td colSpan="3">
                <span
                  className="fiber"
                  style={{
                    float: 'left',
                    verticalAlign: 'middle',
                    paddingLeft: '3px',
                  }}
                ></span>
                <span
                  className="fiberPo"
                  style={{
                    float: 'right',
                    verticalAlign: 'middle',
                    paddingRight: '3px',
                  }}
                ></span>
              </td>

              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>PUR_date</td>

              {/*purchased date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row8">
              <InfoItemOb className="infoCol1" name="DGN DTE:" />
              <td colSpan="3" className="dgnDte"></td>

              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>SHP_date</td>
              {/*shipping date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row9">
              <InfoItemOb className="infoCol1" name="PO's 2" />
              <td colSpan="2">
                <span className="pctn" style={{ float: 'left' }}></span>
                <span className="dimension" style={{ float: 'right' }}></span>
              </td>
              {selectedItem.length > 0 ? (
                selectedItem
                  .map((item, idx) => <td key={idx}>{item}</td>)
                  .slice(0, 1)
              ) : (
                <td></td>
              )}
              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>EXP_date</td>
              {/*expected rec date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
            </tr>
            <tr className="row10">
              <InfoItemOb className="infoCol1" name="ST_DATE" />
              <td className="stDate" colSpan="2">
                {
                  search
                    .filter((item) => item.start_dte)

                    .map(
                      (item) =>
                        new Date(item.start_dte).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              {selectedItem.length > 0 ? (
                selectedItem
                  .map((item, idx) => <td key={idx}>{item}</td>)
                  .slice(1, 2)
              ) : (
                <td></td>
              )}
              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>RCV_date</td>

              {/*Actual rec date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row11">
              {search.length > 0 ? (
                <td className="PRL">
                  {PRLmin} - {PRLmax}
                </td>
              ) : (
                <td></td>
              )}

              <td colSpan="2" className="price">
                {
                  search
                    .filter((item) => typeof item.price === 'number')
                    .map((item, idx) => (
                      <div key={idx}>PRICE: ${item.price}</div>
                    ))[0]
                }
              </td>

              <td>
                {selectedItem.map((item) => item).slice(1, 2) == ''
                  ? null
                  : selectedItem
                      .map((item, idx) => (
                        <div key={idx}>
                          {Math.floor(Difference_In_Days)} days
                        </div>
                      ))
                      .slice(1, 2)}
              </td>

              <td>{selectedItem.map((item) => item).slice(1, 2)}</td>

              <td colSpan="2">
                <DatePicker
                  showIcon
                  selected={startDatePicker}
                  onChange={(date) => setStartDatePicker(date)}
                />
              </td>

              <td className="prv30">{past30c}</td>
              <td className="prv30">{past90c}</td>
              <td className="prv30">{past365c}</td>
              {/*purno No*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
            </tr>

            <tr className="row12">
              <td className="cost"></td>
              {/* grading https://www.wane.com/news/sacs-approves-new-grading-scale/*/}
              <td>GRADE</td>
              {search
                .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                .filter((item) => item.percentile)
                .map((item) => item.percentile * 100)[0] > 98 ||
              search
                .flatMap((item) => [item].concat(item.rankRB ?? []))
                .filter((item) => item.percentile)
                .map((item) => item.percentile * 100)[0] > 98 ? (
                <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                  A+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 93 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 93 ? (
                <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 90 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 90 ? (
                <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                  A-
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 87 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 87 ? (
                <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                  B+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 83 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 83 ? (
                <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 80 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 80 ? (
                <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                  B-
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 77 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 77 ? (
                <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                  C+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 73 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 73 ? (
                <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 70 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 70 ? (
                <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                  C-
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 67 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 67 ? (
                <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                  D+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 63 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 63 ? (
                <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 60 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 60 ? (
                <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                  D-
                </td>
              ) : search.length > 0 ? (
                <td style={{ background: '#c0c0c0', fontWeight: 'bold' }}>F</td>
              ) : (
                <td></td>
              )}

              {/* waiting & rcvd table  */}
              {selectedItem.length > 0 ? (
                selectedItem.map((item) => item).slice(1, 2) == '' ? (
                  <td style={{ color: 'red' }}>WAITING</td>
                ) : (
                  <td style={{ color: 'green' }}>RCVD</td>
                )
              ) : (
                <td></td>
              )}

              <td id="recDte" className="recDateSel_cal">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td colSpan="2">
                <DatePicker
                  showIcon
                  selected={endDatePicker}
                  onChange={(date) => setEndDatePicker(date)}
                />
              </td>
              <td className="prv30">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td className="prv90">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td className="prv365">
                {new Date().toISOString().split('T')[0]}
              </td>
              {/*invoice No */}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
            </tr>
          </tbody>

          <tbody id="tb2" className="table2">
            <tr>
              <td>CLRS:{totalItems}</td>
              <td>OH</td>
              {/*PO reorder */}
              <td style={{ background: '#f4a460' }}>REORDER(1yr)</td>
              <td>
                <div className="App">
                  <select
                    name="item-selected"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {/*POS initial */}

                    <option
                      value={[
                        '',

                        '',

                        search.map((item) =>
                          item.first.length
                            ? item.first.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      POS_
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.first.length
                            ? item.first.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.second.length
                            ? item.second.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.third.length
                            ? item.third.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.fourth.length
                            ? item.fourth.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.fifth.length
                            ? item.fifth.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.sixth.length
                            ? item.sixth.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>
                  </select>
                </div>
              </td>
              <td>SOLD</td>
              <td colSpan={2}>N days</td>
              <td>SOLD30</td>
              <td>SOLD90</td>
              <td>SOLD365</td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
            </tr>
          </tbody>

          {/* body table3 */}
          {search.length > 0 ? (
            loading === false ? (
              <tbody id="tt" className="bottomSearch">
                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => item.itemkey2)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        style={{ textAlign: 'left', color: 'blue' }}
                      >
                        {item.itemkey2}
                      </div>
                    ))}
                  <div style={{ textAlign: 'left' }}>TOTAL</div>
                </td>

                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => typeof item.onhand === 'number')
                    .map((item, idx) => (
                      <div key={idx}>{item.onhand}</div>
                    ))}
                  <div>{totalItems2}</div>
                </td>
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.poreorder.length ? (
                      item.poreorder.map((item2, idx2) => (
                        <div key={idx2}>{item2.total}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems1}</div>
                </td>

                {selectedItem.length > 0 ? (
                  <td style={{ padding: '0' }}>
                    {selectedItem
                      .map((item, idx) => <div key={idx}>{item}</div>)
                      .slice(2)}
                    <div>{totalItems3}</div>
                  </td>
                ) : (
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.first.length ? (
                        item.first.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}

                    <div>{totalItems12}</div>
                  </td>
                )}
                {/*sold amount regarding RCVD date //loading && render table cell */}
                <td style={{ padding: '0' }}>
                  {selectedData.length
                    ? loadingDatapick === false
                      ? selectedData.map((item, idx) =>
                          item.new.length ? (
                            item.new.map((item, idx2) => (
                              <div key={idx2}>{item.qtyshp}</div>
                            ))
                          ) : (
                            <div key={idx}></div>
                          )
                        )
                      : search.map((item, idx) => (
                          <div key={idx}>Loading...</div>
                        ))
                    : loadingDatapick === false
                    ? search.map((item, idx) => (
                        <div key={idx}>{item.purno}</div>
                      ))
                    : search.map((item, idx) => <div key={idx}>Loading</div>)}
                  <div>{totalItemsFromRCVD}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => typeof item.qtyshp === 'number')
                    .map((item, idx) => (
                      <div key={idx}>{item.qtyshp}</div>
                    ))}
                  <div></div>
                </td>
                <td style={{ padding: '0' }}>
                  <div></div>
                </td>

                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sold30.length ? (
                      item.sold30.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems4}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sold90.length ? (
                      item.sold90.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems5}</div>
                </td>

                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sold365.length ? (
                      item.sold365.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems6}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sixth.length ? (
                      item.sixth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems7}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fifth.length ? (
                      item.fifth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems8}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fourth.length ? (
                      item.fourth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems9}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.third.length ? (
                      item.third.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems10}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.second.length ? (
                      item.second.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                  <div>{totalItems11}</div>
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.first.length ? (
                      item.first.map((item2, idx2) => (
                        <div key={idx2} style={{ borderRightWidth: '1px' }}>
                          {item2.qtyord}
                        </div>
                      ))
                    ) : (
                      <div key={idx} style={{ borderRightWidth: '1px' }}></div>
                    )
                  )}
                  <div style={{ borderRightWidth: '1px' }}>{totalItems12}</div>
                </td>
              </tbody>
            ) : (
              <>Loading...</>
            )
          ) : loading === false ? (
            <>
              <BlankPage />
            </>
          ) : (
            <>Loading...</>
          )}
        </table>
      </div>
    </div>
  );
};
