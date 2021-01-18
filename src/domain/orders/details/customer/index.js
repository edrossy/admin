import styled from "@emotion/styled"
import { Input } from "@rebass/forms"
import { navigate } from "gatsby"
import React, { useState } from "react"
import { Box, Text } from "rebass"
import Card from "../../../../components/card"
import EditableInput from "../../../../components/editable-input"
import CustomerInformationEdit from "./edit"

const CustomerEmailLabel = styled(Text)`
  ${props =>
    props.customerExist &&
    `
  color: #006fbb;
  z-index: 1000;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  `}
`

const CustomerInformation = ({
  order,
  updateOrder,
  setShow,
  show,
  toaster,
}) => {
  return (
    <Card mr={3} mb={4} width="100%">
      <Card.Header
        action={{
          type: "primary",
          label: "Edit",
          onClick: () => setShow(true),
        }}
      >
        Customer
      </Card.Header>
      <Card.Body>
        <Box px={3}>
          <Text color="gray">Contact</Text>
          <CustomerEmailLabel
            pt={3}
            customerExist={order.customer}
            onClick={() => {
              if (order.customer) {
                navigate(`/a/customers/${order.customer.id}`)
              } else {
                return
              }
            }}
          >
            {order.email}
          </CustomerEmailLabel>
          <Text pt={2}>
            {order.shipping_address.first_name}{" "}
            {order.shipping_address.last_name}
          </Text>
        </Box>
        <Card.VerticalDivider mx={3} />
        <Box px={3}>
          <Text color="gray">Shipping</Text>
          <Text pt={3}>{order.shipping_address.address_1}</Text>
          {order.shipping_address.address_2 && (
            <Text pt={2}>{order.shipping_address.address_2}</Text>
          )}
          <Text pt={2}>
            {order.shipping_address.postal_code} {order.shipping_address.city},{" "}
            {order.shipping_address.country_code}
          </Text>
          <Text pt={2}>{order.shipping_address.country}</Text>
        </Box>
        <Card.VerticalDivider mx={3} />
        <Box px={3}>
          <Text color="gray">Billing</Text>
          {order.billing_address_id ? (
            <>
              <Text pt={3}>{order.billing_address.address_1}</Text>
              {order.billing_address.address_2 && (
                <Text pt={2}>{order.billing_address.address_2}</Text>
              )}
              <Text pt={2}>
                {order.billing_address.postal_code} {order.billing_address.city}
                , {order.billing_address.country_code}
              </Text>
              <Text pt={2}>{order.billing_address.country}</Text>
            </>
          ) : (
            <Text pt={3}>No billing address</Text>
          )}
        </Box>
      </Card.Body>
      {show && (
        <CustomerInformationEdit
          toaster={toaster}
          onUpdate={updateOrder}
          customerData={{ email: order.email }}
          shippingData={order.shipping_address}
          onDismiss={() => setShow(false)}
        />
      )}
    </Card>
  )
}

export default CustomerInformation