import React from "react"
import NumberedItem from "../../../../components/molecules/numbered-item"
import { useDiscountForm } from "../form/discount-form-context"
import { DiscountConditionType } from "../form/mappers"
import useConditionActions from "./use-condition-actions"

const Conditions: React.FC = () => {
  const { conditions } = useDiscountForm()

  const { getActions } = useConditionActions()
  return (
    <div className="pt-6 flex flex-col gap-y-small">
      {Object.keys(conditions).map((key, i) => {
        return (
          conditions[key] && (
            <NumberedItem
              index={i + 1}
              title={getTitle(key)}
              actions={getActions(key)}
            />
          )
        )
      })}
    </div>
  )
}

const getTitle = (type: DiscountConditionType) => {
  switch (type) {
    case DiscountConditionType.PRODUCTS:
      return "Products"
    case DiscountConditionType.PRODUCT_COLLECTIONS:
      return "Product collections"
    case DiscountConditionType.PRODUCT_TAGS:
      return "Product tags"
    case DiscountConditionType.CUSTOMER_GROUPS:
      return "Customer groups"
    case DiscountConditionType.PRODUCT_TYPES:
      return "Product types"
  }
}

export default Conditions