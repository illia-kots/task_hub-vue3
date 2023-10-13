<template>
  <div className="todoapp">
    <h1 className="todoapp__title">todos</h1>

    <h2 className="todoapp__userTitle">123</h2>

    <div className="todoapp__content">
      <Header
        userId={USER_ID}
        createdTodo={handleAddTodo}
        isLoading={isLoading}
        todos={todos}
        isCheckedToggleAll={isCheckedToggleAll}
        toggleAllTodos={toggleAllTodos}
      />

      <TodoList
        todos={visibleTodos}
        tempTodo={tempTodo}
        processedTodos={processedTodos}
        onUpdateTodo={handleUpdateTodo}
        onUpdateTitle={handleUpdateTitle}
        onDelete={handleDeleteTodo}
      />

      {!!todos.length && (
        <Footer
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          onDelete={handleDeleteTodo}
        />
      )}
    </div>

    {error && (
      <Notifications
        setError={setError}
        error={error}
      />
    )}
  </div>
</template>
