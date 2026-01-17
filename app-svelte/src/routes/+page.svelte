<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.user}
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
				Welcome to <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PocketKit</span>
			</h1>
			<p class="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
				You are logged in as <span class="font-semibold text-indigo-600">{data.user.email}</span>
			</p>
		</div>

		<div class="max-w-3xl mx-auto">
			<div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
				<div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
					<h3 class="text-lg font-semibold text-white">User Information</h3>
				</div>
				<div class="px-6 py-6">
					<dl class="divide-y divide-gray-200">
						<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
							<dt class="text-sm font-semibold text-gray-700 flex items-center">
								<svg class="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								Email
							</dt>
							<dd class="mt-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
								{data.user.email}
							</dd>
						</div>
						{#if data.user.username}
							<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
								<dt class="text-sm font-semibold text-gray-700 flex items-center">
									<svg class="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									Username
								</dt>
								<dd class="mt-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
									{data.user.username}
								</dd>
							</div>
						{/if}
						<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
							<dt class="text-sm font-semibold text-gray-700 flex items-center">
								<svg class="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Verified
							</dt>
							<dd class="mt-2 text-sm sm:mt-0 sm:col-span-2">
								{#if data.user.verified}
									<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
										<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
										</svg>
										Verified
									</span>
								{:else}
									<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
										<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
										Not Verified
									</span>
								{/if}
							</dd>
						</div>
						<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
							<dt class="text-sm font-semibold text-gray-700 flex items-center">
								<svg class="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
								</svg>
								User ID
							</dt>
							<dd class="mt-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono text-xs bg-gray-50 px-3 py-2 rounded-lg inline-block">
								{data.user.id}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div class="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
				<p class="text-gray-600 mb-4">
					This is your PocketKit starter app. You can now start building your SvelteKit + PocketBase application!
				</p>
				<ul class="space-y-2 text-sm text-gray-700">
					<li class="flex items-start">
						<svg class="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
						Authentication is already set up with login and registration
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
						Tailwind CSS with forms plugin for beautiful UI components
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 mr-2 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
						PocketBase backend ready at <code class="text-xs bg-white px-2 py-1 rounded">http://localhost:8090/_</code>
					</li>
				</ul>
			</div>
		</div>
	</div>
{:else}
	<div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-8 shadow-lg">
				<svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
			</div>
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
				Welcome to <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PocketKit</span>
			</h1>
			<p class="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
				A modern SvelteKit + PocketBase starter template with authentication, beautiful UI, and production-ready deployment configurations.
			</p>
			<div class="mt-10 flex justify-center gap-4">
				<a
					href="/auth/login"
					class="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-200"
				>
					Sign in
					<svg class="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
				<a
					href="/auth/register"
					class="inline-flex items-center px-8 py-3.5 border-2 border-gray-300 text-base font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
				>
					Sign up
				</a>
			</div>
		</div>

		<div class="mt-20 grid gap-8 md:grid-cols-3">
			<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
				<div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Secure Authentication</h3>
				<p class="text-gray-600 text-sm">
					Cookie-based server-side authentication with PocketBase. Secure, reliable, and easy to extend.
				</p>
			</div>

			<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
				<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Beautiful UI</h3>
				<p class="text-gray-600 text-sm">
					Tailwind CSS with forms plugin for stunning, responsive designs out of the box.
				</p>
			</div>

			<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
				<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Production Ready</h3>
				<p class="text-gray-600 text-sm">
					Configured for Vercel (frontend) and Fly.io (backend) deployment. Start building immediately.
				</p>
			</div>
		</div>
	</div>
{/if}
