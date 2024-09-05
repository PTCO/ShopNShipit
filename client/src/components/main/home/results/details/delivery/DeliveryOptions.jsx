const DeliveryOptions = ({deliveryOptions}) => {
    return (
        <>
        {
            deliveryOptions.map( option =>  {
                return <Option key={option.Delivery_ID} option={option} />
            })
        }
        </>
    )
}
export default DeliveryOptions;