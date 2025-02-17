import React, { useCallback, useEffect, useState } from "react";
import './product.css';
import { Button, Card, Input, Modal, Pagination, Spin } from "antd";
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../../customHooks/useAxios";
import { PRODUCT_LIST_ENDPOINT } from "../../constants/endpoints";
import { productButtonsList, productSortingFormField, productFilteringFormField, actionButtonsList } from "../../constants/product";
import requireAuth from "../../utilities/hocs/requireAuth";
import { debounce, removeFalsyValuesFromObject } from "../../utilities/helper";

const CustomForm = React.lazy(() => import("../../components/customForm"));

const ProductScreen = () => {
    const navigate = useNavigate();

    const { dispatchActions, loading, response } = useAxios();
    const [queryInfo, setQueryInfo] = useState({});
    const [pagination, setPagination] = useState({
        total: 0,
        limit: 10,
        current: 1,
    });

    const [actionModalInfo, setActionModalInfo] = useState({
        open: false,
        type: null,
    });

    const fetchProducts = (query, prevQuery={}) => {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(removeFalsyValuesFromObject({...prevQuery, ...query}))) {
            queryParams.set(key, value);
        }
        const endpoint = `${PRODUCT_LIST_ENDPOINT}?${queryParams.toString()}`;
        dispatchActions("get", null, endpoint)

        setQueryInfo({
            ...prevQuery,
            ...query,
        })
    };

    const onSearchInput = useCallback(debounce(fetchProducts, 1000), []);

    useEffect(() => {
        const query = {
            pageNumber: 1,
            pageSize: 10
        }
        fetchProducts(query, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPagination({
            total: response?.count,
            limit: queryInfo?.pageSize,
            current: queryInfo?.pageNumber
        })
    }, [response, queryInfo])

    return (
        <Spin spinning={loading}>
            <section className="">
                <div className="d-grid gap-14 guest-page-header product-header">
                    <h2 className="text-black">Products List</h2>
                    <div className="d-flex align-items-center justify-center gap-14">
                        <Input
                            placeholder="Search Brand Name"
                            allowClear
                            onChange={(event) => {
                                const searchQuery = removeFalsyValuesFromObject({
                                    ...queryInfo,
                                    brandName: event.target.value
                                })
                                onSearchInput(searchQuery, {...queryInfo});
                            }}
                        />

                        {
                            actionButtonsList?.map((actionBtn) => {
                                return (
                                    <Button
                                        key={actionBtn?.type}
                                        onClick={() => {
                                            setActionModalInfo({
                                                open: true,
                                                type: actionBtn?.type,
                                            })
                                        }}
                                    >
                                        {actionBtn?.title}
                                    </Button>
                                );
                            })
                        }
                    </div>
                </div>

                
                <div className="container">
                    
                    <div className="d-flex justify-end mt-14">
                        <Button
                            type="primary"
                            onClick={() => {
                                fetchProducts(
                                    {
                                        pageNumber: queryInfo?.pageNumber,
                                        pageSize: queryInfo?.pageSize,
                                    },
                                    {}
                                )
                            }}
                        >
                            Clear All Filters
                        </Button>
                    </div>
                    <div className="d-grid gap-14 product-cards-box">
                        {
                            response?.dtoList?.map((product) => {
                                return (
                                    <Card
                                        key={product?.pid}
                                        hoverable
                                        className="overflow-hidden"
                                        onClick={() => {
                                            navigate(`/product/${product?.pcode}`)
                                        }}
                                        size="small"
                                        cover={
                                            <img
                                                alt={product?.pname}
                                                src={product?.photo}
                                                loading='lazy'
                                            />
                                        }
                                    >
                                        <div className="font-700 text-semiBlack card-title">{product?.pdetails}</div>
                                        <div className="d-flex justify-between gap-14 text-grey">
                                            <span>{product?.brandName} ({product?.categoryName})</span>
                                            <span>₹ {product?.cost}</span>
                                        </div>
                                    </Card>
                                );
                            })
                        }
                    </div>

                    <Pagination
                        showSizeChanger
                        className="product-pagination"
                        total={pagination?.total}
                        current={pagination?.current}
                        hideOnSinglePage
                        pageSize={pagination?.limit}
                        pageSizeOptions={[10, 20, 50]}
                        responsive={true}
                        align="center"
                        onChange={(current, pageSize) => {
                            const query = {
                                pageNumber: current,
                                pageSize
                            }
                            fetchProducts(query, {...queryInfo});
                        }}
                    />
                </div>


            </section>


            <Modal
                title={actionModalInfo.type === 'sort' ? 'Sorting' : 'Filtering'}
                open={actionModalInfo.open}
                maskClosable
                destroyOnClose
                footer={null}
                onCancel={() => {
                    setActionModalInfo({
                        open: false,
                        type: null,
                    });
                }}
            >
                <CustomForm
                    initialValues={
                        actionModalInfo.type === 'sort'
                        ? { ...queryInfo }
                        : {
                            ...queryInfo,
                            filterBy: queryInfo?.brandName
                                        ? 'brandName'
                                        : queryInfo?.isVeg ? 'isVeg' : ''
                        }

                    }
                    formFieldsList={
                        actionModalInfo.type === 'sort'
                        ? productSortingFormField()
                        : productFilteringFormField()
                    }
                    onSuccess={(values) => {
                        const queryValues = JSON.parse(JSON.stringify(values));
                        
                        if (actionModalInfo.type === 'filter') {
                            for(let key in queryValues) {
                                if(queryValues[key] === undefined || !(values['filterBy']?.includes(key))) {
                                    delete queryValues[key];
                                }
                            }
                            delete queryValues['filterBy'];
                        }

                        fetchProducts(queryValues, {...queryInfo});
                        setActionModalInfo({
                            open: false,
                            type: null,
                        });
                    }}
                    buttonsList={productButtonsList}
                    buttonGroupClasses={'d-flex justify-end gap-14 product-sort-btns'}
                    onClose={() => {
                        setActionModalInfo({
                            open: false,
                            type: null,
                        });
                    }}
                />
            </Modal>
        </Spin>
    );
};

export default requireAuth(ProductScreen);