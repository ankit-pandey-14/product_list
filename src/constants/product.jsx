import { Checkbox, Radio, Select } from "antd";

export const productSortingFormField = () => [
    {
        key: 'sortDirection',
        label: "Sorting Order",
        name: 'sortDirection',
        rules: [
            {
                required: true,
                message: 'Please select an option to sort.'
            }
        ],
        renderItem: (
            <Radio.Group>
                <Radio value={"ASC"}>Ascending</Radio>
                <Radio value={"DESC"}>Descending</Radio>
            </Radio.Group>
        ),
    },
    {
        key: 'sortColumn',
        label: "Sort By",
        name: 'sortColumn',
        rules: [
            {
                required: true,
                message: 'Please select a column.'
            }
        ],
        renderItem: (
            <Radio.Group>
                <Radio value={"cost"}>Price</Radio>
                <Radio value={"pname"}>Name</Radio>
                {/* <Radio value={"brandName"}>Brand</Radio> */}
            </Radio.Group>
        ),
    },
];

export const productFilteringFormField = () => [
    {
        key: 'filterBy',
        label: "Filter By",
        name: 'filterBy',
        rules: [
            {
                required: true,
                message: 'Please select an option to filter.'
            }
        ],
        renderItem: (
            <Checkbox.Group>
                <Checkbox value={"brandName"}>Brand Name</Checkbox>
                <Checkbox value={"isVeg"}>IsVeg</Checkbox>
            </Checkbox.Group>
        ),
    },
    {
        key: 'brandName',
        label: 'Brands',
        name: 'brandName',
        rules: [],
        dependency: ['filterBy'],
        dependencyValue: 'brandName',
        renderItem: (
            <Select allowClear placeholder="Please select a brand">
                <Select.Option value="Town Bus">Town Bus</Select.Option>
                <Select.Option value="Wonderland Foods">Wonderland Foods</Select.Option>
                <Select.Option value="McLeod">McLeod</Select.Option>
                <Select.Option value="Kellogs">Kellogs</Select.Option>
            </Select>
        ),
    },
    {
        key: 'isVeg',
        label: 'Food Type',
        name: 'isVeg',
        rules: [],
        dependency: ['filterBy'],
        dependencyValue: 'isVeg',
        renderItem: (
            <Radio.Group>
                <Radio value={true}>Veg</Radio>
                <Radio value={false}>Non-Veg</Radio>
            </Radio.Group>
        ),
    },
];

export const productButtonsList = [
    {
        key: 'PB1',
        type: 'primary',
        block: false,
        htmlType: 'submit',
        title: 'Ok',
    },
    {
        key: 'PB2',
        block: false,
        htmlType: 'button',
        title: 'Close',
    },
];


export const actionButtonsList = [
    {
        type: 'sort',
        title: 'Sort'
    },
    {
        type: 'filter',
        title: 'Filter'
    },
];