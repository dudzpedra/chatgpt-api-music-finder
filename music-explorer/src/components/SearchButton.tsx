import { Button } from "antd";
import { useState } from "react"

interface SearchButtonProps {
  inputValue: string;
}

export default function SearchButton({inputValue}: SearchButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(inputValue);
  const onClick = () => {
    setIsLoading(true);
  }
  

  return (
    <Button disabled={!inputValue?.length} loading={isLoading} onClick={onClick}>
      E X P L O R A R
    </Button>
  )
}