import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import RouteFallback from '@/components/layout/RouteFallback'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Courses = lazy(() => import('@/pages/Courses'))
const CourseDetail = lazy(() => import('@/pages/CourseDetail'))
const Programs = lazy(() => import('@/pages/Programs'))
const ProgramDetail = lazy(() => import('@/pages/ProgramDetail'))
const Team = lazy(() => import('@/pages/Team'))
const Events = lazy(() => import('@/pages/Events'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Home />
              </Suspense>
            }
          />
          {[
            ['/about', About],
            ['/courses', Courses],
            ['/courses/:id', CourseDetail],
            ['/programs', Programs],
            ['/programs/:slug', ProgramDetail],
            ['/team', Team],
            ['/events', Events],
            ['/contact', Contact],
            ['*', NotFound],
          ].map(([path, Page]) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<RouteFallback />}>
                  <Page />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
