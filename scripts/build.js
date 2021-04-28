/*!
 * Copyright (C) 2021 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const fs = require('fs/promises')
const path = require('path')
const { DOCS_BUILD_DIR, ICON_BUILD_DIR, ICON_BUILD_FILE_NAME } = require('../lib/constants.js')
const { buildIcons } = require('../lib/buildIcons.js');

async function build () {
  await fs.rmdir(ICON_BUILD_DIR, { recursive: true })
  await fs.rmdir(DOCS_BUILD_DIR, { recursive: true })
  await fs.mkdir(ICON_BUILD_DIR)
  await fs.mkdir(DOCS_BUILD_DIR)
  await buildIcons({ type: 'css' })
  await buildIcons({ type: 'svg' })
  await fs.copyFile(path.resolve(`${ICON_BUILD_DIR}/${ICON_BUILD_FILE_NAME}.css`), path.resolve(`${DOCS_BUILD_DIR}/${ICON_BUILD_FILE_NAME}.css`))
  await fs.copyFile(path.resolve(`${ICON_BUILD_DIR}/${ICON_BUILD_FILE_NAME}.svg`), path.resolve(`${DOCS_BUILD_DIR}/${ICON_BUILD_FILE_NAME}.svg`))
}

build()