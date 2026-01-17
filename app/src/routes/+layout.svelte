<script lang="ts">
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<svelte:head>
	<title>Gym App</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	{#if data.user}
		<nav class="bg-white shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<div class="flex-shrink-0 flex items-center">
							<a href="/" class="text-xl font-bold text-indigo-600">Gym App</a>
						</div>
					</div>
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-700">
							{data.user.email}
						</span>
						<form method="POST" action="/auth/logout">
							<button
								type="submit"
								class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign out
							</button>
						</form>
					</div>
				</div>
			</div>
		</nav>
	{/if}

	<main>
		{@render children()}
	</main>
</div>
