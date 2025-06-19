
1. React – Input form focus and scroll issue

> You're working on a payment form that asks for credit card details. As users type, the app should automatically scroll to the next field. On some Android devices, it scrolls to the wrong place or focuses the wrong input, especially when the keyboard appears or after a validation error.
Task: How would you make sure the correct input always gets focus and the scroll works smoothly, even after the screen updates or the keyboard opens?



✅ Interviewer Notes:

useRef for storing persistent input refs

useEffect for triggering scroll/focus on changes

Handling keyboard visibility (especially Android quirks)

Avoiding re-renders that reset refs

Possibly ScrollView.scrollTo() or KeyboardAvoidingView



---

2. React – Managing permissions across the app

> You need to build a system where different users have different access levels — like guest, basic, and premium. Screens across the app should be able to check if a user has permission to do something, like editing a profile or accessing settings. The permissions might change during the session.
Task: How would you design this so all parts of the app can easily check permissions without passing data manually between components?



✅ Interviewer Notes:

React.createContext, useContext

Provider wrapping app

Custom hook (e.g., usePermission())

Role-based or capability-based access

Optimistic UI, handling loading states

Security: Don’t just hide UI — block access too



---

3. TypeScript – Supporting multiple versions of the same function

> You’re creating a tracking function that works differently on each platform. For example, on iOS it needs just a name and some optional details, on Android it also takes a priority level, and on web it should handle a list of events.
Task: How would you write the TypeScript definition so developers on each platform can use the same function safely, without breaking their code?



✅ Interviewer Notes:

Function overloads

type or interface with union types

Platform-specific typing

Type safety with optional vs required args

Avoiding any — strong inference



---

4. Jest – Replacing a class in tests

> Your app uses a helper that uploads files to the cloud. This helper is written as a class in a separate file. You want to test your component without actually uploading anything.
Task: How would you change your tests so the upload class is replaced with a fake version that lets you check whether it was called correctly?



✅ Interviewer Notes:

jest.mock() with factory

Mocking class constructor and methods

Spies: mockImplementation, mock.calls

Resetting between tests: jest.resetModules()

Verifying calls, avoiding side effects



---

5. Testing – Understanding what "coverage" really means

> Your team wants at least 85% test coverage in every pull request. You make a small change — just moving some styles around — and suddenly your test coverage drops to 82%, even though nothing important changed.
Task: What does code coverage actually measure, and why might small changes cause a drop? How would you decide whether this drop matters or not?



✅ Interviewer Notes:

Coverage = statements, branches, functions, lines

Dead code or removed logic paths

New uncovered paths via conditionals

Importance of meaningful coverage vs gaming metrics

Tools: --coverage, Istanbul/NYC, lcov reports



---

6. React Native – Explaining how native modules work

> You want to build a feature that uses native code — like a camera scanner — and call it from your JavaScript code in the app. The scan should return a result or an error, and it shouldn’t block the app’s performance.
Task: Can you explain how your JavaScript code communicates with the native code under the hood, and what steps are involved in making that work?



✅ Interviewer Notes:

Native Module + JS bridge

RCT_EXPORT_METHOD, Promise, Callback

Threads: JS thread, native UI thread

Memory cleanup and lifecycle

Cancellable operations: subscriptions, events



---

7. React Native – Communicating with a WebView

> You have a WebView inside your app that shows a trading dashboard built with web technologies. The web page needs to receive live data from the app, and also send messages back — for example, to open a screen in the app when a button is clicked.
Task: How would you set up this two-way communication between the app and the WebView, and what would you do to make it fast and secure?



✅ Interviewer Notes:

window.ReactNativeWebView.postMessage()

onMessage in React Native

injectJavaScript() or injectedJavaScriptBeforeContentLoaded

Message format: JSON with type/payload

Security: origin checks, throttling, input sanitization



---

8. React – Solving performance issues with large lists

> You’re building a chat app where new messages come in every second. Even when users are looking at a different chat room, the whole message list keeps re-rendering, and the app becomes slow.
Task: How would you find out what’s causing the slowdown, and what changes would you make so only the right parts of the screen update?



✅ Interviewer Notes:

React.memo, useMemo, useCallback

Virtualized lists (FlatList, react-window)

Dependency arrays and stale closures

Profiling with React DevTools

Avoiding unnecessary re-renders



---

9. TypeScript – Making sure translations are correct

> Your app supports many languages. You use a function like t('some.key') to show the right text, and the actual words are stored in large JSON files. Developers sometimes use the wrong keys, which breaks things at runtime.
Task: How would you help catch these mistakes while writing code, instead of finding them after the app is running?



✅ Interviewer Notes:

Typed t() function

keyof typeof translations

Template literal types ('home.' + keyof ...)

Code generation tools for types from JSON

Linting/CI checks



---

10. React Native – Preventing mismatches between JS and native code

> Your team sometimes releases updates to the JavaScript part of the app without updating the app in the app store. A recent release broke the app because it used a new feature that wasn’t available in the older native code.
Task: How would you design a system to prevent this from happening again? How would you make sure your JavaScript and native code always stay compatible?



✅ Interviewer Notes:

Versioning checks (native version passed to JS)

Feature flags or capability negotiation

JS fallback if native feature missing

CI pipeline checks for compatibility

CodePush gating


---

1. React – Preserving scroll position in a list

> You’re working on a screen that shows a list of articles. When the user clicks an article, it opens a detailed view. After they go back, the list scroll position resets to the top, and users find this annoying.
Task: How would you keep the scroll position when the user comes back, so the list stays exactly where it was?



✅ Interviewer Notes:

useRef to store scroll offset

Controlled scroll position (window.scrollTo, FlatList.scrollToOffset)

State management between routes

Component unmount behavior

React Navigation screen options (if RN)



---

2. React – Handling application-wide error states

> Sometimes, your app crashes when unexpected data is returned from the server. You want to make sure the app doesn’t show a blank screen or crash the entire view when this happens.
Task: How would you make sure users see a helpful message instead of a crash, and what parts of the app should be responsible for handling these situations?



✅ Interviewer Notes:

ErrorBoundary (class or wrapper)

Fallback UIs

Centralized error logging/reporting (Sentry, etc.)

Graceful error messages

Separation of concerns



---

3. TypeScript – Creating reusable, typed form fields

> You’re building a form component that should work with many data types — text, number, date, etc. You want to make sure each field only accepts valid props based on its type (e.g., onChange should be type-safe).
Task: How would you use TypeScript to create a flexible form field component that still keeps all types correct?



✅ Interviewer Notes:

Generics in components (<T extends FieldType>)

Discriminated unions

Conditional types

IntelliSense-aware props

Avoid any



---

4. Jest – Choosing what to test and how

> You’re adding tests for a login screen. It has a form, a loading spinner, and shows an error if credentials are wrong. You only have time to write 2–3 tests.
Task: What would you choose to test first, and why? What would you leave out?



✅ Interviewer Notes:

Prioritize logic and user-critical paths

Value-driven testing (not 100% coverage)

Good: success + failure flow

May skip: UI layout, button text

Bonus: test as user sees (@testing-library)



---

5. React Native – Supporting dark mode across the app

> Your app needs to support light and dark themes, and automatically adapt based on the user’s system preferences. Different screens and components use different background colors.
Task: How would you make sure the whole app follows the correct theme, even when switching modes or reloading screens?



✅ Interviewer Notes:

Appearance API

useColorScheme()

Theming with Context or react-native-paper

Dynamic styles or tokens

Testing for consistency



---

6. React Native – Handling app deep linking

> You want to allow users to open your app directly from a shared link like myapp://product/123 or a website link like https://myapp.com/product/123.
Task: How would you set up the app to open on the right screen, and pass the product ID from the link?



✅ Interviewer Notes:

Linking module, Linking.addEventListener

Universal links vs deep links

react-navigation linking config

Fallback behavior

Edge cases: app in background, cold start



---

7. React – Preventing unnecessary API calls

> On a dashboard screen, an API call runs every time the user clicks between tabs — even if they go back to a tab they already visited. The data doesn't change often.
Task: How would you make sure each API call only runs when truly needed, not every time the user switches tabs?



✅ Interviewer Notes:

useEffect with dependency array

useMemo or data caching

Tab state persistence

Global state (Redux, Zustand)

Conditional fetches



---

8. TypeScript – Safely working with third-party libraries

> You’re using a charting library that doesn’t have complete TypeScript types. You want to use it without turning off type checking for the whole file.
Task: How would you safely work with this library while still keeping good type safety in the rest of your code?



✅ Interviewer Notes:

declare module

Wrapping types in any selectively

Creating local .d.ts file

Avoiding full @ts-ignore

Possibly using Partial<T>, Record<string, unknown>



---

9. Jest – Testing navigation behavior

> You have a screen with a button that, when pressed, should take the user to a confirmation screen. You want to write a unit test that verifies this navigation works as expected.
Task: How would you test whether the navigation happens correctly, without actually rendering the next screen?



✅ Interviewer Notes:

jest.mock('@react-navigation/native')

Mock useNavigation() or navigation.navigate()

toHaveBeenCalledWith()

Focus on intent, not destination rendering

Isolation testing



---

10. React Native – Animating screen transitions or components

> You want to add a smooth fade-in effect when a screen appears, and a slide-out effect when it closes. These animations should feel smooth even on older devices.
Task: How would you add this kind of animation, and what tools or libraries would you consider using?



✅ Interviewer Notes:

Animated API

react-native-reanimated or LayoutAnimation

useSharedValue, useAnimatedStyle

Performance: native thread offloading

Choosing animation libraries



---

