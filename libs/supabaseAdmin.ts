import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { Database } from "@/types/types_db";
import { Price, Product } from "@/types/types";

import { stripe } from "@/libs/stripe";
import { toDateTime } from "@/libs/helpers";

export const supabaseAdmin = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const upsertProductRecord = async (product: Stripe.Product) => {
    const productData = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description,
        image: product.images[0] ?? null,
        metadata: product.metadata,
    }
    
    const {error} = await supabaseAdmin.from('products').upsert([productData]);
    
    if (error) {
        console.log(error.message);
    }

    console.log(`Product data upserted successfully ${product.id}`);
}

const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData = {
        id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? undefined,
        type: price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval: price.recurring?.interval,
        interval_count: price.recurring?.interval_count,
        trial_period_days: price.recurring?.trial_period_days,
        metadata: price.metadata,
    }

    const {error} = await supabaseAdmin.from('prices').upsert([priceData]);
    if (error) {
        console.log(error.message);
    }

    console.log(`Price data upserted successfully ${price.id}`);
}

const createOrRetrieveCustomer = async (email: string, uuid: string) => {
    const {data,error} = await supabaseAdmin
                                    .from('customers')
                                    .select('stripe_customer_id')
                                    .eq('id', uuid)
                                    .single();

    if(error || !data?.stripe_customer_id) {
        const customerData: {metadata: {supabaseUUID: string}; email?: string} = {
            metadata: {supabaseUUID: uuid},
            email: email,
        };

        if(email) customerData.email = email;

        const customer = await stripe.customers.create(customerData);

        const {error: supabaseError} = await supabaseAdmin
                                    .from('customers')
                                    .upsert([{id: uuid, stripe_customer_id: customer.id}]);

        if(supabaseError) {
            console.log(supabaseError.message);
        }

        console.log(`New customer created and upserted successfully ${uuid}`);
        return customer.id;
    }

    return data.stripe_customer_id;
}

const copyBillingDetailsToCustomer = async (customerId: string, billingDetails: Stripe.CustomerUpdateParams) => {
    await stripe.customers.update(customerId, billingDetails);
    console.log(`Billing details copied to customer ${customerId}`);
}
