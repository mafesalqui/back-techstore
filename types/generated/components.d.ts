import type { Schema, Struct } from '@strapi/strapi';

export interface ProductOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_product_order_items';
  info: {
    displayName: 'OrderItem';
  };
  attributes: {
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.order-item': ProductOrderItem;
    }
  }
}
