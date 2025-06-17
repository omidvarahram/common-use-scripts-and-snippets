
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
