import { Input } from "antd";
import React from 'react';

const { Search } = Input;

interface SearchInputProps {
  handleSearch: (input: string) => void;
  isLoading: boolean;
}
export default function SearchInput({handleSearch, isLoading}: SearchInputProps) {

  const onSearch = (value: string) => handleSearch(value);
  
  return (
    <Search size="large" placeholder="Adicione uma palavra..." onSearch={onSearch} enterButton allowClear loading={isLoading} />
  )
}