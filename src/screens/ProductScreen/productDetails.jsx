import { useEffect } from 'react';
import './product.css';
import { useParams } from 'react-router-dom';

import { useAxios } from '../../customHooks/useAxios';
import { Image, Spin } from 'antd';
import { PRODUCT_DETAIL_ENDPOINT } from '../../constants/endpoints';

import FallbackPreview from '../../assets/fallback-preview.png';
import requireAuth from '../../utilities/hocs/requireAuth';

const ProductDetailScreen = () => {
    const { id } = useParams();

    const { dispatchActions, response, loading } = useAxios();

    const fetchProductDetails = () => {
        const endpoint = `${PRODUCT_DETAIL_ENDPOINT}${id}`;
        dispatchActions('get', null, endpoint);
    };

    useEffect(() => {
        fetchProductDetails();
    }, [])

    return (
        <Spin spinning={loading}>
            <section>
                <div className='guest-page-header'>
                    <h2>Product Detail</h2>
                </div>

                <div className='container'>
                    {
                        response && response?.dtoList && response?.dtoList?.length > 0
                        ? (
                            <div className='d-grid align-items-center product-detail'>
                                <Image
                                    width={'100%'}
                                    src={response?.dtoList?.[0]?.photo}
                                    loading='lazy'
                                    alt={response?.dtoList?.[0]?.pname}
                                    fallback={FallbackPreview}
                                />

                                <div className='product-description'>
                                    <h2 className='text-black'>{response?.dtoList?.[0]?.pname}</h2>

                                    <div className='d-flex align-items-baseline gap-5'>
                                        <div
                                            style={{
                                                backgroundColor: response?.dtoList?.[0]?.isVeg
                                                                ? "#82b559"
                                                                : "#680co7"
                                            }}
                                            className='dot'
                                        >
                                        </div>
                                        {
                                            response?.dtoList?.[0]?.isVeg
                                            ? 'Veg'
                                            : 'Non-Veg'
                                        }
                                        <div
                                            style={{
                                                backgroundColor: response?.dtoList?.[0]?.isVeg
                                                                ? "#82b559"
                                                                : "#680co7"
                                            }}
                                            className='dot'
                                        >
                                        </div>
                                    </div>

                                    <div className='d-flex gap-14 text-grey product-brand'>
                                        <span>{response?.dtoList?.[0]?.brandName}</span>
                                        --
                                        <span>{response?.dtoList?.[0]?.categoryName}</span>
                                    </div>

                                    <p>{response?.dtoList?.[0]?.pdetails}</p>

                                    <div className='d-flex align-items-center product-price'>
                                        <span className='text-black font-700'>
                                            ₹ {response?.dtoList?.[0]?.cost}
                                        </span>
                                        / {response?.dtoList?.[0]?.printedWeight}
                                    </div>
                                    <div className='text-grey'>GST : {response?.dtoList?.[0]?.gst}%</div>
                                </div>
                            </div>
                        )
                        : (
                            <div
                                className='text-center font-700 text-semiBlack'
                                style={{ paddingTop: 23 }}
                            >
                                No Such Data is Available
                            </div>
                        )

                    }

                </div>
            </section>
        </Spin>
    );
};

export default requireAuth(ProductDetailScreen);