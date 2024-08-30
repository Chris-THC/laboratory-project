import ImgBackground from '@/renderer/src/assets/img/back.jpg' // Assuming the image path is correct
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React from 'react'

interface PropsFilePDF {
  customerInfo: ClientsInterface | null | undefined
  currentDate: string
  testResults: ContentsResultsInterface[] | null | undefined
}

export const FilePDF: React.FC<PropsFilePDF> = ({ customerInfo, currentDate, testResults }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image fixed src={ImgBackground} style={styles.backgroundImage} />

        <View fixed style={styles.customerLayaud}>
          <View style={styles.userInfoSection}>
            <Text
              style={styles.textUserInfo}
            >{`PACIENTE:  ${customerInfo!.name.toUpperCase()}`}</Text>
            <Text style={styles.textUserInfo}>{`EDAD:  ${customerInfo!.age} AÑOS`}</Text>
            <Text
              style={styles.textUserInfo}
            >{`DOCTOR (A):  ${customerInfo!.doctorName.toUpperCase()}`}</Text>
            <Text style={styles.textUserInfo}>{`FECHA:  ${currentDate}`}</Text>
          </View>
        </View>

        {/* comenzar aqui */}
        <View style={styles.tableInfo}>
          <View fixed style={styles.headerRow}>
            <Text style={styles.headerCell}>ESTUDIO</Text>
            <View style={styles.resultHeaderCell}>
              <Text style={styles.resultHeaderText}>RESULTADO</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textRow}>{'DENTRO DE \n REFERENCIA'}</Text>
                <Text style={{ flex: 1, fontSize: 8, textAlign: 'center' }}>
                  {'FUERA DE \n REFERENCIA'}
                </Text>
              </View>
            </View>
            <Text style={styles.unitCell}>UNIDADES</Text>
            <Text style={styles.referenceCell}>VALOR DE REFERENCIA</Text>
          </View>

          {/* <View>
            {testResults!.map((row, index) => (
              <View key={index} style={styles.dataRow}>
                <Text style={styles.headerCell}>{row.contentsDTO?.name}</Text>
                <View style={styles.resultHeaderCell}>
                  <View style={{ flexDirection: 'column', padding: 0, margin: 0 }}>
                    {row.contentsDTO?.referencesDTO.map((reference, idx) => {
                      const resultValue = row.resultValue
                      const maxValue = reference.vmax
                      const minValue = reference.vmin

                      // Verificar si todos los valores son números válidos
                      const isResultValueNumeric = !isNaN(parseFloat(resultValue.toString()))
                      const isMaxValueNumeric = !isNaN(parseFloat(maxValue))
                      const isMinValueNumeric = !isNaN(parseFloat(minValue))

                      if (!isResultValueNumeric || !isMaxValueNumeric || !isMinValueNumeric) {
                        return (
                          <View key={idx} style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textCompare, { fontWeight: 'bold' }]}>
                              {resultValue.toString().toUpperCase()}
                            </Text>
                          </View>
                        )
                      }

                      const numericResultValue = parseFloat(resultValue.toString())
                      const numericMaxValue = parseFloat(maxValue)
                      const numericMinValue = parseFloat(minValue)

                      const isWithinRange =
                        numericResultValue >= numericMinValue &&
                        numericResultValue <= numericMaxValue

                      return (
                        <View key={idx} style={{ flexDirection: 'row' }}>
                          {isWithinRange ? (
                            <Text
                              style={[
                                styles.textCompare,
                                { borderRightWidth: 1, borderRightColor: '#111', marginRight: 0.4 }
                              ]}
                            >
                              {resultValue}
                            </Text>
                          ) : (
                            <Text style={styles.textCompare}>{''}</Text>
                          )}

                          <Text style={styles.textCompare}>{isWithinRange ? '' : resultValue}</Text>
                        </View>
                      )
                    })}
                  </View>
                </View>
                <Text style={styles.unitCell}>
                  {row.contentsDTO?.units === null ? '' : row.contentsDTO?.units}
                </Text>
                <View style={styles.referenceCell}>
                  {row.contentsDTO?.referencesDTO.map((reference, idx) => (
                    <Text key={idx}>
                      {`${reference.vrefText === null ? '' : reference.vrefText} ${reference.vmin === null ? '' : reference.vmin} - ${reference.vmax === null ? '' : reference.vmax}`}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View> */}

          {testResults!.map((row, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.headerCell}>{row.contentsDTO?.name}</Text>
              <View style={styles.resultHeaderCell}>
                <View style={{ flexDirection: 'column', padding: 0, margin: 0 }}>
                  {row.contentsDTO?.referencesDTO.map((reference, idx) => {
                    const resultValue = row.resultValue
                    const maxValue = reference.vmax
                    const minValue = reference.vmin

                    // Verificar si todos los valores son números válidos
                    const isResultValueNumeric = !isNaN(parseFloat(resultValue.toString()))
                    const isMaxValueNumeric = !isNaN(parseFloat(maxValue))
                    const isMinValueNumeric = !isNaN(parseFloat(minValue))

                    if (!isResultValueNumeric || !isMaxValueNumeric || !isMinValueNumeric) {
                      return (
                        <View key={idx} style={{ flexDirection: 'row' }}>
                          <Text style={[styles.textCompare, { fontWeight: 'bold' }]}>
                            {resultValue.toString().toUpperCase()}
                          </Text>
                        </View>
                      )
                    }

                    const numericResultValue = parseFloat(resultValue.toString())
                    const numericMaxValue = parseFloat(maxValue)
                    const numericMinValue = parseFloat(minValue)

                    const isWithinRange =
                      numericResultValue >= numericMinValue && numericResultValue <= numericMaxValue

                    return (
                      <View key={idx} style={{ flexDirection: 'row' }}>
                        {isWithinRange ? (
                          <Text
                            style={[
                              styles.textCompare,
                              { borderRightWidth: 1, borderRightColor: '#111', marginRight: 0.4 }
                            ]}
                          >
                            {resultValue}
                          </Text>
                        ) : (
                          <Text style={styles.textCompare}>{''}</Text>
                        )}

                        <Text style={styles.textCompare}>{isWithinRange ? '' : resultValue}</Text>
                      </View>
                    )
                  })}
                </View>
              </View>
              <Text style={styles.unitCell}>
                {row.contentsDTO?.units === null ? '' : row.contentsDTO?.units}
              </Text>
              <View style={styles.referenceCell}>
                {row.contentsDTO?.referencesDTO.map((reference, idx) => (
                  <Text key={idx}>
                    {`${reference.vrefText === null ? '' : reference.vrefText} ${reference.vmin === null ? '' : reference.vmin} - ${reference.vmax === null ? '' : reference.vmax}`}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View fixed style={styles.footerContent}></View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'relative'
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  customerLayaud: {
    flexDirection: 'row',
    height: 210,
    marginBottom: 2
  },
  userInfoSection: {
    flexDirection: 'column',
    height: 80,
    width: 350,
    top: 120,
    left: 228,
    border: 0.5,
    borderBottomColor: '#111',
    borderBottom: 'none'
  },
  textUserInfo: {
    color: '#002060',
    fontWeight: 'bold',
    fontSize: 11,
    paddingVertical: 3,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#111',
    height: 25
  },
  tableInfo: {
    displayflex: 'table',
    width: 'auto',
    marginHorizontal: 8,
    borderStyle: 'solid',
    borderWidth: 1
  },
  footerContent: {
    height: 180
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottom: 1
  },
  headerCell: {
    flex: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10,
    borderStyle: 'solid',
    borderRightWidth: 1,
    maxWidth: 141
  },
  resultHeaderCell: {
    flex: 1.1, // Ajustar según sea necesario para alinear con el header
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10,
    borderStyle: 'solid',
    borderRight: 1
  },
  resultHeaderText: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 2
  },
  unitCell: {
    flex: 0.5,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10,
    borderStyle: 'solid',
    borderRight: 1
  },
  referenceCell: {
    flex: 1.5,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontSize: 10
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 0,
    margin: 0
    // borderBottomColor: '#111'
  },
  dataCell: {
    flex: 1,
    padding: 2,
    textAlign: 'center',
    color: '#333333',
    fontSize: 10,
    borderRightWidth: 1, // Aplica el borde a las celdas de datos también
    borderRightColor: '#111',
    borderStyle: 'solid',
    marginVertical: 2
  },
  dataCellExamName: {
    flex: 1,
    padding: 2,
    textAlign: 'left',
    color: '#333333',
    fontSize: 10,
    marginLeft: 5,
    borderRightWidth: 1,
    borderRightColor: '#111',
    borderStyle: 'solid',
    maxWidth: 140
  },
  textCompare: {
    flex: 1,
    textAlign: 'center'
  },
  // add new styles
  textRow: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#111',
    marginRight: 0.4,
    fontSize: 8,
    textAlign: 'center'
  }
})
