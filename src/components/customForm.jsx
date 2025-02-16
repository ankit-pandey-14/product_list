import { Button, Form } from "antd";
import { memo } from "react";

const CustomForm = ({formFieldsList=[], onSuccess, buttonsList=[], buttonGroupClasses, onClose, classes}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onSuccess(values)
    };

    return (
        <Form
            name="basic"
            form={form}
            layout="vertical"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={() => {}}
            autoComplete="off"
            requiredMark
            className={classes || ''}
        >
            {
                formFieldsList.map((formField) => {
                    return (
                        <div key={formField?.key}>
                            <Form.Item
                                label={formField?.label}
                                name={formField?.name}
                                dependencies={formField?.dependency || []}
                                rules={
                                    formField?.dependency
                                    ? [
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if(
                                                    formField?.dependency &&
                                                    getFieldValue(formField?.dependency) &&
                                                    getFieldValue(formField?.dependency)?.includes(formField?.dependencyValue)
                                                ) {
                                                    if(value === undefined) {
                                                        return Promise.reject(new Error('Please select an option to filter.'))
                                                    }
                                                    return Promise.resolve();
                                                }

                                                return Promise.resolve();

                                            },
                                        }),
                                    ]
                                    : formField?.rules
                                }
                            >
                                { formField?.renderItem }
                            </Form.Item>
                        </div>
                    );
                })
            }

            <div className={buttonGroupClasses || ''}>
                {
                    buttonsList?.map((btn) => {
                        return (
                            <Button
                                key={btn?.key}
                                type={btn?.type || 'default'}
                                block={btn?.block}
                                htmlType={btn?.htmlType || 'button'}
                                onClick={() => {
                                    if(btn?.htmlType === 'button') {
                                        onClose();
                                    }
                                }}
                            >
                                {btn?.title}
                            </Button>
                        );
                    })
                }
            </div>
        </Form>
    );
};

export default memo(CustomForm);