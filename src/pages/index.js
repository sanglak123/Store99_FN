import { ApiData } from '@/callApi/data';
import Carousel99 from '@/components/carousel99';
import ProductionHot from '@/components/productHot';
import MaintanceSystem from '@/layouts/maintance';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DataSelector } from 'redux/selector/DataSelector';
import { LoadDataSuccess } from 'redux/slice/DataSlice';

function Store99(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const LoadData = async () => {
      await ApiData.GetData(dispatch, LoadDataSuccess);
    };
    LoadData();
  }, []);

  const Data = useSelector(DataSelector.Data);
  const Maintance = Data?.Maintance;
  const TradeMarks = Data?.Trademarks;
  return (
    Maintance?.active ?
      <MaintanceSystem />
      :

      <div id='home_page'>
        <Container>
          <Carousel99 />
          {
            TradeMarks?.map((trademark, index) => {
              return (
                <div key={index} className="produc_hot">
                  <ProductionHot
                    trademark={trademark}
                  />
                </div>

              )
            })
          }

        </Container>
      </div>
  );
}

export default Store99;