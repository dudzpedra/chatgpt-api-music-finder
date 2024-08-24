import { Col, Divider, Form, Layout, message, Row, Select, Spin, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { getOpenAIResponse } from "../openaiService";
import SearchInput from "./SearchInput";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Header, Footer } = Layout;
const { Item } = Form;

const musicalGenders = [
  {
    title: "Samba",
    value: 1,
  },
  {
    title: "Rock",
    value: 2,
  },
  {
    title: "Pop",
    value: 3,
  },
  {
    title: "MPB",
    value: 4,
  },
];

export default function HomeScreen() {
  const [textOutput, setTextOutput] = useState("");
  const [selectedGender, setSelectedGender] = useState("Samba");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSelect = (value: string) => {
    setSelectedGender(value);
  }

  const handleSearch = async (searchValue: string) => {
    setIsLoading(true);
    if (!searchValue.length) {
      setIsLoading(false);
      return message.error("Você precisa digitar uma palavra antes de pesquisar!");
    }
    setTextOutput(
      `Procurando músicas do gênero musical ${selectedGender} que utilizam a palavra: ${searchValue}...`
    )
    try {
      const openaiResponse = await getOpenAIResponse(
        `Procure músicas do gênero musical ${selectedGender} que utilizam a palavra: ${searchValue}`
      )
      setInterval(() => setIsLoading(false), 5000);
      // setIsLoading(false);
      console.log(openaiResponse);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      return message.error("Não encontramos músicas com as opções escolhidas!")      
    }
  }


  return (
    <>
      <Header style={{ backgroundColor: "gray" }}>
        <Title>Music Explorer</Title>
      </Header>
      <Paragraph>Descubra novas músicas utilizando IA para buscar a partir de um gênero musical e uma palavra escolhida.</Paragraph>
      <Divider />
      <Form layout="vertical">
        <Row>
          <Item label="Selecione um gênero musical">
            <Select size="large" onChange={handleSelect} defaultValue={musicalGenders[0].title}>
              {musicalGenders.map((gender) => (
                <Option key={gender.value} value={gender.title}>{gender.title}</Option>
              ))}
            </Select>
          </Item>
        </Row>  
        <Divider />
        <Row>
          <Item label="Escolha uma palavra para pesquisar">
            <SearchInput handleSearch={handleSearch} isLoading={isLoading} />
          </Item>
          <Col span={12}>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Item label="Resultado da pesquisa">
          {isLoading && (
              <>
                <Spin />
                <Divider />
                <Paragraph>
                  {textOutput}
                </Paragraph>
              </>
            )}
          </Item>
        </Row>
      </Form>
      <Divider />
      <Footer>
        Created by dudzpedra. Licensed by MIT.
      </Footer>
    </>
  )
}