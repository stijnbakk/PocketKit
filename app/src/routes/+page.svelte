<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.user}
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
				Welcome to Gym App
			</h1>
			<p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
				You are logged in as <span class="font-semibold text-indigo-600">{data.user.email}</span>
			</p>
			<div class="mt-8">
				<div class="bg-white shadow sm:rounded-lg">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="text-lg leading-6 font-medium text-gray-900">User Information</h3>
						<div class="mt-5 border-t border-gray-200">
							<dl class="divide-y divide-gray-200">
								<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt class="text-sm font-medium text-gray-500">Email</dt>
									<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.user.email}
									</dd>
								</div>
								{#if data.user.username}
									<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
										<dt class="text-sm font-medium text-gray-500">Username</dt>
										<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
											{data.user.username}
										</dd>
									</div>
								{/if}
								<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt class="text-sm font-medium text-gray-500">Verified</dt>
									<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.user.verified ? 'Yes' : 'No'}
									</dd>
								</div>
								<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
									<dt class="text-sm font-medium text-gray-500">User ID</dt>
									<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
										{data.user.id}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
				Welcome to Gym App
			</h1>
			<p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
				Please sign in or create an account to get started
			</p>
			<div class="mt-8 flex justify-center gap-4">
				<a
					href="/auth/login"
					class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Sign in
				</a>
				<a
					href="/auth/register"
					class="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Sign up
				</a>
			</div>
		</div>
	</div>
{/if}
