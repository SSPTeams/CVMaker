import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-bold text-rose-500">
                    CVMaker
                  </Link>
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/resumes"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-rose-500"
                    >
                      My Resumes
                    </Link>
                    <Link
                      to="/resumes/new"
                      className="ml-4 rounded-md bg-rose-500 px-3 py-2 text-sm font-medium text-white hover:bg-rose-600"
                    >
                      Create Resume
                    </Link>

                    <Menu as="div" className="relative ml-3">
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600">{user?.name?.[0] || 'U'}</span>
                        </div>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-rose-500"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="ml-4 rounded-md bg-rose-500 px-3 py-2 text-sm font-medium text-white hover:bg-rose-600"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {isAuthenticated ? (
                <>
                  <Disclosure.Button
                    as={Link}
                    to="/resumes"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    My Resumes
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/resumes/new"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Create Resume
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Sign out
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Log in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Sign up
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 