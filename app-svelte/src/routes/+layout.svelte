<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';

	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<svelte:head>
	<title>Gym App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
	{#if data.user}
		<nav class="bg-white border-b border-gray-200 shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<div class="flex-shrink-0 flex items-center">
							<a href="/" class="flex items-center space-x-2">
								<div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg"></div>
								<span class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PocketKit</span>
							</a>
						</div>
					</div>
					<div class="flex items-center space-x-4">
						<div class="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg">
							<div class="w-2 h-2 bg-green-500 rounded-full"></div>
							<span class="text-sm font-medium text-gray-700">
								{data.user.email}
							</span>
						</div>
						<form method="POST" action="/auth/logout">
							<button
								type="submit"
								class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
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
