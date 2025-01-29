import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus, RotateCcw, X, Check, ShoppingCart } from "lucide-react";
import { increment, decrement, reset } from "./store/slices/counterSlice";
import {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "./store/slices/cartSlice";
import { openModal, closeModal } from "./store/slices/modalSlice";
import { addTodo, toggleComplete, deleteTodo } from "./store/slices/todoSlice";
import {
  addPlayer,
  removePlayer,
  updateScore,
} from "./store/slices/playersSlice";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const cart = useSelector((state) => state.cart);
  const isModalOpen = useSelector((state) => state.modal);
  const todos = useSelector((state) => state.todos);
  const players = useSelector((state) => state.players);

  const [newTodo, setNewTodo] = useState("");
  const [newPlayer, setNewPlayer] = useState("");
  const [newProduct, setNewProduct] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white backdrop-blur-lg bg-opacity-90 p-6 rounded-2xl shadow-lg border border-indigo-50">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">Counter</h2>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => dispatch(decrement())}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Minus size={24} />
            </button>
            <span className="text-4xl font-bold text-indigo-900 w-20 text-center">
              {count}
            </span>
            <button
              onClick={() => dispatch(increment())}
              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={24} />
            </button>
            <button
              onClick={() => dispatch(reset())}
              className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>

        <div className="bg-white backdrop-blur-lg bg-opacity-90 p-6 rounded-2xl shadow-lg border border-indigo-50">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">Shopping Cart</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="Product name"
              className="flex-1 border border-indigo-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (newProduct) {
                  dispatch(addItem({ id: Date.now(), name: newProduct }));
                  setNewProduct("");
                }
              }}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>Add</span>
            </button>
          </div>
          <ul className="space-y-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl"
              >
                <span className="flex-1 font-medium text-indigo-900">{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 ml-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white backdrop-blur-lg bg-opacity-90 p-6 rounded-2xl shadow-lg border border-indigo-50">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">Modal Demo</h2>
          <button
            onClick={() => dispatch(openModal())}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Open Modal
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                <h3 className="text-2xl font-bold mb-4 text-indigo-900">Modal Window</h3>
                <p className="mb-6 text-gray-600">This is a modal window with a beautiful backdrop blur effect.</p>
                <button
                  onClick={() => dispatch(closeModal())}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white backdrop-blur-lg bg-opacity-90 p-6 rounded-2xl shadow-lg border border-indigo-50">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">Todo List</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New task"
              className="flex-1 border border-indigo-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (newTodo) {
                  dispatch(addTodo(newTodo));
                  setNewTodo("");
                }
              }}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl group"
              >
                <button
                  onClick={() => dispatch(toggleComplete(todo.id))}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    todo.completed ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  <Check size={16} className="text-white" />
                </button>
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-indigo-900"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white backdrop-blur-lg bg-opacity-90 p-6 rounded-2xl shadow-lg border border-indigo-50">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">Players List</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Player name"
              className="flex-1 border border-indigo-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (newPlayer) {
                  dispatch(addPlayer(newPlayer));
                  setNewPlayer("");
                }
              }}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
          <ul className="space-y-3">
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl"
              >
                <span className="flex-1 font-medium text-indigo-900">{player.name}</span>
                <input
                  type="number"
                  value={player.score}
                  onChange={(e) =>
                    dispatch(
                      updateScore({
                        id: player.id,
                        score: parseInt(e.target.value) || 0,
                      })
                    )
                  }
                  className="w-24 border border-indigo-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => dispatch(removePlayer(player.id))}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;