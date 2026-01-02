<script lang="ts" module>
	import { CreditCard, Minus, Package, Plus, Shield, Trash2, Truck } from 'lucide-svelte';
	import { Button } from '../button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
	import { Input } from '../input';
	import { Label } from '../label';
	import * as Select from '../select/index.js';

	export interface CartItem {
		id: string;
		name: string;
		price: number;
		originalPrice?: number;
		quantity: number;
		image: string;
		color: string;
		size: string;
		stock: number;
	}

	export interface ShippingMethod {
		id: string;
		name: string;
		price: number;
		estimatedDays: string;
		description: string;
	}
</script>

<script lang="ts">
	let items = $state<CartItem[]>([
		{
			id: '1',
			name: 'Classic Chronograph Watch',
			price: 299.99,
			originalPrice: 399.99,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
			color: 'Black',
			size: 'Standard',
			stock: 5
		},
		{
			id: '2',
			name: 'Sport Diver Watch',
			price: 199.99,
			quantity: 2,
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
			color: 'Blue',
			size: 'Standard',
			stock: 3
		}
	]);

	let shippingMethod = $state('standard');
	const shippingMethods: ShippingMethod[] = [
		{
			id: 'standard',
			name: 'Standard Shipping',
			price: 5.99,
			estimatedDays: '3-5 days',
			description: 'Free shipping on orders over $200'
		},
		{
			id: 'express',
			name: 'Express Shipping',
			price: 12.99,
			estimatedDays: '1-2 days',
			description: 'Priority delivery with tracking'
		}
	];

	const subtotal = $derived(items.reduce((sum, item) => sum + item.price * item.quantity, 0));

	const shipping = shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
	const total = $derived(subtotal + shipping);

	const updateQuantity = (id: string, change: number) => {
		items = items.map((item) => {
			if (item.id === id) {
				const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + change));
				return { ...item, quantity: newQuantity };
			}
			return item;
		});
	};
	const removeItem = (id: string) => {
		items = items.filter((item) => item.id !== id);
	};

	const shippingOptions = shippingMethods.map((sm) => ({ value: sm.id }));

	const triggerContent = $derived(
		shippingMethods.find((sm) => sm.id === shippingMethod)?.name ?? 'Select shipping method'
	);
</script>

<div class="mx-auto w-full">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- main cart section -->
		<div class="space-y-6 lg:col-span-2">
			<div>
				<h1 class="text-2xl font-semibold">Shopping Cart</h1>
				<p class="text-muted-foreground">
					{items.length}
					{items.length === 1 ? 'item' : 'items'} in your cart
				</p>
			</div>

			<div class="space-y-4">
				{#each items as item, i}
					<Card class="overflow-hidden p-0">
						<CardContent class="p-0">
							<div class="flex h-full flex-col md:flex-row">
								<!-- product image -->
								<div class="relative h-auto w-full md:w-32">
									<img
										src={item.image}
										alt={item.name}
										width={500}
										height={500}
										class="h-full w-full object-cover md:w-32"
									/>
								</div>

								<!-- product details -->
								<div class="flex-1 p-6 pb-3">
									<div class="flex justify-between">
										<div>
											<h3 class="font-medium">{item.name}</h3>
											<p class="text-sm text-muted-foreground">
												{item.color} • {item.size}
											</p>
										</div>
										<Button variant="ghost" size="icon" onclick={() => removeItem(item.id)}>
											<Trash2 class="h-4 w-4" />
										</Button>
									</div>

									<div class="mt-4 flex items-center justify-between">
										<div class="flex items-center gap-2">
											<Button
												variant="outline"
												size="icon"
												onclick={() => updateQuantity(item.id, -1)}
											>
												<Minus class="h-4 w-4" />
											</Button>
											<span class="w-8 text-center">
												{item.quantity}
											</span>
											<Button
												variant="outline"
												size="icon"
												onclick={() => updateQuantity(item.id, 1)}
											>
												<Plus class="h-4 w-4" />
											</Button>
										</div>

										<div class="text-right">
											<div class="font-medium">
												{(item.price * item.quantity).toFixed(2)}
											</div>
											{#if item.originalPrice}
												<div class="text-sm text-muted-foreground line-through">
													{(item.originalPrice * item.quantity).toFixed(2)}
												</div>
											{/if}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>

		<!-- order summary -->
		<div class="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Order Summary</CardTitle>
					<CardDescription>Review your order details and shipping information</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-2">
						<Label>Shipping Method</Label>
						<Select.Root type="single" name="favoriteFruit" bind:value={shippingMethod}>
							<Select.Trigger class="w-full max-w-none data-[size=default]:h-auto">
								{triggerContent}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each shippingMethods as method, i}
										<Select.Item value={method.id} class="!h-auto">
											<div class="flex flex-col justify-between text-start">
												<div class="font-medium">{method.name}</div>
												<div class="text-sm text-muted-foreground">
													{method.estimatedDays}
												</div>
												<div class="font-medium">
													{method.price.toFixed(2)}
												</div>
											</div>
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
					<!-- promo code -->
					<div class="space-y-2">
						<Label>Promo Code</Label>
						<div class="flex gap-2">
							<Input placeholder="Enter promo code" />
							<Button variant="outline">Apply</Button>
						</div>
					</div>

					<!-- order summary -->
					<div class="space-y-2">
						<div class="flex justify-between text-sm">
							<span>Subtotal</span>
							<span>{subtotal.toFixed(2)}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span>Shipping</span>
							<span>{shipping.toFixed(2)}</span>
						</div>
						<div class="flex justify-between font-medium">
							<span>Total</span>
							<span>{total.toFixed(2)}</span>
						</div>
					</div>

					<!-- features -->
					<div class="space-y-4 border-t pt-4">
						<div class="flex items-center gap-2 text-sm">
							<Package class="h-4 w-4 text-primary" />
							<span>Free returns within 30 days</span>
						</div>
						<div class="flex items-center gap-2 text-sm">
							<Shield class="h-4 w-4 text-primary" />
							<span>Secure payment</span>
						</div>
						<div class="flex items-center gap-2 text-sm">
							<Truck class="h-4 w-4 text-primary" />
							<span>Fast delivery</span>
						</div>
					</div>

					<!-- checkout button -->
					<Button class="w-full">
						<CreditCard class="mr-2 h-4 w-4" />
						Proceed to Checkout
					</Button>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
