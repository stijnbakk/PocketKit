<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full">
		<div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
			<div>
				<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
					Create your account
				</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Join us today! It only takes a minute.
				</p>
			</div>

			<form class="space-y-6" method="POST" use:enhance>
				{#if form?.error}
					<div class="rounded-lg bg-red-50 border border-red-200 p-4">
						<div class="flex">
							<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
							</svg>
							<p class="ml-3 text-sm text-red-800">{form.error}</p>
						</div>
					</div>
				{/if}

				<div class="space-y-4">
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-1">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="you@example.com"
							value={form?.email || ''}
						/>
					</div>

					<div>
						<label for="password" class="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="new-password"
							required
							class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="••••••••"
						/>
					</div>

					<div>
						<label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-1">
							Confirm password
						</label>
						<input
							id="passwordConfirm"
							name="passwordConfirm"
							type="password"
							autocomplete="new-password"
							required
							class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="••••••••"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
					>
						Sign up
					</button>
				</div>

				<div class="text-center">
					<p class="text-sm text-gray-600">
						Already have an account?
						<a href="/auth/login" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
							Sign in
						</a>
					</p>
				</div>
			</form>
		</div>
	</div>
</div>
